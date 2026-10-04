import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ json }) => {
  json(200, { framework: "qwik", renderedAt: new Date().toISOString() });
};
