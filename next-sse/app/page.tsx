import { Suspense } from 'react';
import LiveEvents from './components/live-events';

export const dynamic = 'force-dynamic';

async function DelayedServerTime() {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, 2000);
  await promise;
  return <p>Server-rendered at {new Date().toISOString()} (after a two-second delay).</p>;
}

export default function Page() {
  return (
    <main style={{ maxWidth: 700, margin: '3rem auto', fontFamily: 'system-ui', lineHeight: 1.6 }}>
      <h1>Next.js streaming on Nitroship</h1>
      <p>EventSource connects to a live stream on Compute; the section below streams separately from the server.</p>
      <LiveEvents />
      <section>
        <h2>Suspense-streamed server component</h2>
        <Suspense fallback={<p>Loading server time…</p>}>
          <DelayedServerTime />
        </Suspense>
      </section>
      <p>For raw chunks, try <code>curl -N /api/stream</code>.</p>
    </main>
  );
}
