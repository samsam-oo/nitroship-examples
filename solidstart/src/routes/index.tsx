import { createAsync, query } from "@solidjs/router";

const getServerTime = query(async () => {
  "use server";
  return new Date().toISOString();
}, "server-time");

export const route = { preload: () => getServerTime() };

export default function Home() {
  const serverTime = createAsync(() => getServerTime());
  return (
    <main>
      <h1>SolidStart on Nitroship</h1>
      <p>Server-rendered at <time>{serverTime()}</time></p>
      <p>The timestamp comes from a server-only query, not the browser.</p>
      <p><a href="/api/hello">Server JSON</a> · <a href="/marker.txt">CDN asset</a></p>
    </main>
  );
}
