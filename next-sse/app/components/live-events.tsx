'use client';

import { useEffect, useState } from 'react';

type Tick = { id: string; time: string };

export default function LiveEvents() {
  const [status, setStatus] = useState('connecting');
  const [lastId, setLastId] = useState('none');
  const [ticks, setTicks] = useState<Tick[]>([]);

  useEffect(() => {
    const source = new EventSource('/api/events');
    source.onopen = () => setStatus('connected');
    source.onerror = () => setStatus('reconnecting');
    source.addEventListener('tick', (event) => {
      const message = event as MessageEvent<string>;
      const { time } = JSON.parse(message.data) as { time: string };
      setLastId(message.lastEventId);
      setTicks((previous) => [{ id: message.lastEventId, time }, ...previous].slice(0, 8));
    });
    return () => source.close();
  }, []);

  return (
    <section>
      <h2>Live SSE ticks</h2>
      <p>Connection: <strong aria-live="polite">{status}</strong></p>
      <p>Last event ID: <strong data-testid="last-id">{lastId}</strong></p>
      <ol aria-live="polite">
        {ticks.map((tick) => <li key={tick.id}>#{tick.id} at {tick.time}</li>)}
      </ol>
    </section>
  );
}
