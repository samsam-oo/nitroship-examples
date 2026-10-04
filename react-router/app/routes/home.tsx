import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "React Router on Nitroship" },
    { name: "description", content: "Server-rendered React Router example." },
  ];
}

export function loader() {
  return { framework: "react-router", serverTime: new Date().toISOString() };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <h1>React Router on Nitroship</h1>
      <p>This page is rendered on the server for each request.</p>
      <p>Server time: <time>{loaderData.serverTime}</time></p>
      <p><a href="/api/info">JSON server route</a></p>
      <p><a href="/example.svg">Public asset served by the CDN</a></p>
      <img src="/example.svg" alt="Nitroship example" width="160" height="80" />
    </main>
  );
}
