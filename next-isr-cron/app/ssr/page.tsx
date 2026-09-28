import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const interesting = ['host', 'x-forwarded-for', 'x-forwarded-host', 'x-forwarded-proto'] as const;

export default async function SsrPage() {
  const incoming = await headers();
  return (
    <main>
      <h1>Server-side rendered headers</h1>
      <p>Rendered at: <time>{new Date().toISOString()}</time></p>
      <dl>
        {interesting.map((name) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{incoming.get(name) ?? '(not provided)'}</dd>
          </div>
        ))}
      </dl>
      <a href="/">Home</a>
    </main>
  );
}
