# Docker realtime

A framework-free Node.js 24 Compute app built from the root `Dockerfile`. It exercises WebSocket echo/broadcast and ping/pong RTT, incremental SSE with `Last-Event-ID` replay, a custom HTTP port (`8080`), and the `/healthz` readiness probe. The optional `GREETING` template variable appears on the tester page at `/`.

## Run locally

```sh
npm ci
npm start
# or: docker build -t docker-realtime . && docker run --rm -p 8080:8080 docker-realtime
```

Open `http://localhost:8080/` in two browser tabs. `/info` reports hostname, PID, uptime, and the instance's WebSocket and SSE connection counts. `GET /healthz` returns `ok`.

## Deploy and verify

```sh
ntro deploy docker-realtime --app <app-name>
# or use the Deploy on Nitroship button for this directory
```

Replace `https://<deployed-host>` below with the resulting URL. For a streaming response (IDs and timestamps arrive once a second, without waiting for the connection to end):

```sh
curl -N https://<deployed-host>/events
# Reconnect to the same instance with a recent event ID to replay buffered ticks:
curl -N -H 'Last-Event-ID: 3' https://<deployed-host>/events
curl https://<deployed-host>/healthz
curl https://<deployed-host>/info
```

Node.js 22+ includes a WebSocket client; connect two clients and check that echo goes only to its sender while broadcast reaches both:

```sh
BASE=https://<deployed-host> node --input-type=module <<'JS'
const url = process.env.BASE.replace(/^http/, 'ws') + '/ws';
const a = new WebSocket(url);
const b = new WebSocket(url);
const ready = ws => new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});
await Promise.all([ready(a), ready(b)]);
for (const [name, ws] of [['A', a], ['B', b]]) {
  ws.addEventListener('message', event => console.log(name, event.data));
}
a.send(JSON.stringify({ type: 'echo', text: 'only A' }));
a.send(JSON.stringify({ type: 'broadcast', text: 'A and B' }));
a.send(JSON.stringify({ type: 'ping', sentAt: Date.now() }));
setTimeout(() => { a.close(); b.close(); }, 2000);
JS
```

Broadcast clients and the last 60 SSE ticks live **only in one Compute instance**, not across replicas/regions or restarts. `Last-Event-ID` can replay only retained events on that same instance; a reconnect to another instance does not guarantee continuity. Open connections prevent instance freezing; Nitroship limits a WebSocket connection to about one hour, so clients must reconnect. This is a demo, not durable messaging or shared state.
