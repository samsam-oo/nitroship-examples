import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "Remix on Nitroship" }];

export function loader() {
  return json({ renderedAt: new Date().toISOString() }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export default function Index() {
  const { renderedAt } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Remix on Nitroship</h1>
      <p>This page is server rendered using a Remix v2 loader and Vite.</p>
      <p>Server rendered at: <time dateTime={renderedAt}>{renderedAt}</time></p>
      <a href="/api/info">JSON server route</a>
    </main>
  );
}
