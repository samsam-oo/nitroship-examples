import http from 'node:http';
import os from 'node:os';
import { WebSocket, WebSocketServer } from 'ws';

const port = Number(process.env.PORT ?? 8080);
const hostname = os.hostname();
const clients = new Set();
const eventHistory = [];
let eventId = 0;
let stopping = false;

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Docker realtime | Nitroship</title>
  <style>
    body { font: 16px system-ui, sans-serif; max-width: 48rem; margin: 2rem auto; padding: 0 1rem; }
    section { border: 1px solid #bbb; border-radius: .5rem; padding: 1rem; margin: 1rem 0; }
    input { padding: .4rem; width: 65%; } button { padding: .4rem; }
    pre { white-space: pre-wrap; max-height: 14rem; overflow: auto; }
  </style>
</head>
<body>
  <h1>Docker realtime</h1>
  <p id="greeting"></p>
  <p id="info"></p>
  <section>
    <h2>WebSocket: /ws</h2>
    <p id="ws-status">Connecting…</p>
    <input id="message" aria-label="Message" placeholder="Type a message">
    <button id="echo">Echo</button> <button id="broadcast">Broadcast</button>
    <pre id="ws-log" aria-live="polite"></pre>
  </section>
  <section>
    <h2>Server-sent events: /events</h2>
    <p id="sse-status">Connecting…</p>
    <pre id="sse-log" aria-live="polite"></pre>
  </section>
  <script>
    const wsLog = document.querySelector('#ws-log');
    const sseLog = document.querySelector('#sse-log');
    const log = (target, text) => { target.textContent += text + '\\n'; target.scrollTop = target.scrollHeight; };
    fetch('/info').then(response => response.json()).then(info => {
      document.querySelector('#greeting').textContent = info.greeting;
      document.querySelector('#info').textContent = 'Instance ' + info.hostname + ' (PID ' + info.pid + ')';
    });
    const ws = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/ws');
    let pingTimer;
    ws.addEventListener('open', () => {
      document.querySelector('#ws-status').textContent = 'Connected';
      pingTimer = setInterval(() => ws.send(JSON.stringify({ type: 'ping', sentAt: Date.now() })), 5000);
    });
    ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.type === 'pong') log(wsLog, 'Round-trip latency: ' + (Date.now() - message.sentAt) + ' ms');
      else log(wsLog, message.type + ': ' + message.text);
    });
    ws.addEventListener('close', () => {
      clearInterval(pingTimer);
      document.querySelector('#ws-status').textContent = 'Disconnected (reload to reconnect)';
    });
    for (const type of ['echo', 'broadcast']) {
      document.querySelector('#' + type).addEventListener('click', () => {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type, text: document.querySelector('#message').value }));
      });
    }
    const events = new EventSource('/events');
    events.addEventListener('open', () => { document.querySelector('#sse-status').textContent = 'Connected'; });
    events.addEventListener('error', () => { document.querySelector('#sse-status').textContent = 'Reconnecting…'; });
    events.addEventListener('tick', event => log(sseLog, '#' + event.lastEventId + ' ' + JSON.parse(event.data).time));
  </script>
</body>
</html>`;

function sendEvent(res, event) {
  if (!res.write(`id: ${event.id}\nevent: tick\ndata: ${JSON.stringify(event.data)}\n\n`)) {
    // Do not queue an unbounded stream for a client that cannot keep up.
    res.end();
  }
}

const tickTimer = setInterval(() => {
  const event = { id: ++eventId, data: { time: new Date().toISOString(), hostname } };
  eventHistory.push(event);
  if (eventHistory.length > 60) eventHistory.shift();
  for (const res of clients) sendEvent(res, event);
}, 1000);

const server = http.createServer((req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (req.method !== 'GET') {
    res.writeHead(405, { Allow: 'GET' }).end('Method not allowed\n');
  } else if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(page);
  } else if (path === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }).end('ok');
  } else if (path === '/info') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }).end(JSON.stringify({
      hostname, pid: process.pid, uptime: process.uptime(), webSockets: wss.clients.size,
      eventStreams: clients.size, greeting: process.env.GREETING ?? 'Hello from Nitroship',
    }));
  } else if (path === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    res.flushHeaders();
    const lastId = req.headers['last-event-id'];
    if (typeof lastId === 'string' && /^\d+$/.test(lastId) && Number(lastId) <= eventId) {
      for (const event of eventHistory) {
        if (event.id > Number(lastId)) sendEvent(res, event);
      }
    }
    if (res.destroyed || res.writableEnded) return;
    clients.add(res);
    const heartbeat = setInterval(() => { if (!res.write(': heartbeat\n\n')) res.end(); }, 15000);
    res.on('close', () => { clients.delete(res); clearInterval(heartbeat); });
  } else {
    res.writeHead(404).end('Not found\n');
  }
});

const wss = new WebSocketServer({ noServer: true, maxPayload: 64 * 1024 });
server.on('upgrade', (req, socket, head) => {
  if (stopping || new URL(req.url, 'http://localhost').pathname !== '/ws') {
    socket.write('HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n');
    socket.destroy();
    return;
  }
  wss.handleUpgrade(req, socket, head, ws => wss.emit('connection', ws, req));
});

wss.on('connection', ws => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
  ws.on('message', (buffer, isBinary) => {
    if (isBinary) { ws.close(1003, 'Text only'); return; }
    let message;
    try { message = JSON.parse(buffer.toString()); } catch {
      ws.send(JSON.stringify({ type: 'error', text: 'Expected JSON' }));
      return;
    }
    if (message?.type === 'ping' && Number.isFinite(message.sentAt)) {
      ws.send(JSON.stringify({ type: 'pong', sentAt: message.sentAt }));
    } else if ((message?.type === 'echo' || message?.type === 'broadcast') && typeof message.text === 'string') {
      const response = JSON.stringify({ type: message.type, text: message.text });
      if (message.type === 'echo') ws.send(response);
      else for (const peer of wss.clients) if (peer.readyState === WebSocket.OPEN) peer.send(response);
    } else {
      ws.send(JSON.stringify({ type: 'error', text: 'Use echo, broadcast, or ping' }));
    }
  });
});

const pingTimer = setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) { ws.terminate(); continue; }
    ws.isAlive = false;
    ws.ping();
  }
}, 30000);

function shutdown() {
  if (stopping) return;
  stopping = true;
  clearInterval(tickTimer);
  clearInterval(pingTimer);
  for (const res of clients) res.end();
  for (const ws of wss.clients) ws.close(1001, 'Server shutting down');
  server.close();
  const deadline = setTimeout(() => {
    for (const ws of wss.clients) ws.terminate();
    server.closeAllConnections();
  }, 5000);
  deadline.unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

server.listen(port, '0.0.0.0', () => console.log(`Listening on ${port}`));
