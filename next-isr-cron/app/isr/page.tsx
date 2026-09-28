export const revalidate = 30;

export default async function IsrPage() {
  const cached = await fetch('data:text/plain,nitroship-isr', {
    next: { revalidate: 30, tags: ['time'] },
  });

  return (
    <main>
      <h1>Incremental static regeneration</h1>
      <p>Generated at: <time data-testid="generated-at">{new Date().toISOString()}</time></p>
      <p>Tagged fetch (time): {await cached.text()}</p>
      <p>This page is cached for 30 seconds. A stale response may be served while it regenerates.</p>
      <a href="/">Home</a>
    </main>
  );
}
