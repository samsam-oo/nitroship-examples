import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

export const useServerTime = routeLoader$(() => new Date().toISOString());

export default component$(() => {
  const renderedAt = useServerTime();
  return (
    <main>
      <h1>Qwik on Nitroship</h1>
      <p>This page is rendered on the server for each request.</p>
      <p>Server render time: <time>{renderedAt.value}</time></p>
      <p><a href="/api/info">JSON server route</a> · <a href="/marker.txt">Public asset</a></p>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Qwik on Nitroship",
  meta: [{ name: "description", content: "Request-time Qwik City SSR on Nitroship." }],
};
