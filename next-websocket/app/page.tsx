'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

type ChatMessage = { text: string; at: string };

export default function Home() {
  const [status, setStatus] = useState('Connecting…');
  const [clients, setClients] = useState(0);
  const [latency, setLatency] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    let mounted = true;
    let retry: number | undefined;
    let pingTimer: number | undefined;
    let delay = 1000;

    function connect() {
      setStatus('Connecting…');
      const url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/api/ws`;
      const ws = new WebSocket(url);
      socket.current = ws;

      function ping() {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'ping', t: Date.now() }));
      }

      ws.addEventListener('open', () => {
        delay = 1000;
        setStatus('Connected');
        ping();
        pingTimer = window.setInterval(ping, 10_000);
      });
      ws.addEventListener('message', (event: MessageEvent<string>) => {
        try {
          const frame: unknown = JSON.parse(event.data);
          if (typeof frame !== 'object' || frame === null || !('type' in frame)) return;
          if ((frame.type === 'welcome' || frame.type === 'presence') &&
              'clients' in frame && typeof frame.clients === 'number') {
            setClients(frame.clients);
          } else if (frame.type === 'pong' && 't' in frame &&
                     typeof frame.t === 'number' && Number.isFinite(frame.t)) {
            setLatency(Math.max(0, Date.now() - frame.t));
          } else if (frame.type === 'message' && 'text' in frame && 'at' in frame) {
            const { text, at } = frame;
            if (typeof text === 'string' && typeof at === 'string') {
              setMessages((previous) => [...previous, { text, at }]);
            }
          }
        } catch {
          // Ignore frames from an incompatible endpoint.
        }
      });
      ws.addEventListener('close', () => {
        window.clearInterval(pingTimer);
        if (!mounted) return;
        socket.current = null;
        setClients(0);
        setLatency(null);
        setStatus('Reconnecting…');
        retry = window.setTimeout(connect, delay);
        delay = Math.min(delay * 2, 30_000);
      });
    }

    connect();
    return () => {
      mounted = false;
      window.clearTimeout(retry);
      window.clearInterval(pingTimer);
      socket.current?.close();
      socket.current = null;
    };
  }, []);

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim() || socket.current?.readyState !== WebSocket.OPEN) return;
    socket.current.send(text);
    setText('');
  }

  return (
    <main style={{ maxWidth: 640, margin: '4rem auto', padding: '0 1rem', fontFamily: 'system-ui' }}>
      <h1>Nitroship Next.js WebSocket chat</h1>
      <p role="status">{status} · {clients} client{clients === 1 ? '' : 's'} on this instance · Ping: {latency === null ? '—' : `${latency} ms`}</p>
      <p>Connections close after at most one hour and reconnect automatically. Chat is shared only within one instance.</p>
      <ul aria-label="Messages" style={{ minHeight: 180, paddingLeft: '1.5rem' }}>
        {messages.map((message, index) => (
          <li key={index}>
            <time dateTime={message.at}>{new Date(message.at).toLocaleTimeString()}</time>: {message.text}
          </li>
        ))}
      </ul>
      <form onSubmit={send}>
        <label htmlFor="message">Message</label>{' '}
        <input id="message" value={text} onChange={(event) => setText(event.target.value)}
          disabled={status !== 'Connected'} maxLength={262144} />{' '}
        <button type="submit" disabled={status !== 'Connected' || !text.trim()}>Send</button>
      </form>
    </main>
  );
}
