// Render only build-time values intended to be public; never output the secret itself.
import { mkdirSync, writeFileSync } from "node:fs";

const escape = (value) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const fields = [
  ["GREETING", process.env.GREETING ?? "Hello from Nitroship"],
  ["SITE_URL", process.env.SITE_URL ?? "https://example.com"],
  ["PAGE_SIZE", process.env.PAGE_SIZE ?? "20"],
  ["THEME", process.env.THEME ?? "light"],
  ["SHOW_BANNER", process.env.SHOW_BANNER ?? "true"],
];
const secretLength = process.env.API_SECRET?.length ?? 0;
const builtAt = new Date().toISOString();

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nitroship build-env example</title>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem; line-height: 1.6; color: #1f2328; }
      dt { font-weight: 600; } dd { margin: 0 0 1rem; }
      code { background: #f3f4f6; padding: 0.1rem 0.3rem; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>${escape(fields[0][1])}</h1>
    <p>Built by <code>node build.mjs</code> in the Nitroship builder and served from <code>dist/</code>.</p>
    <dl>
      ${fields.map(([key, value]) => `<dt>${escape(key)}</dt><dd><code>${escape(value)}</code></dd>`).join("\n      ")}
      <dt>API_SECRET length</dt><dd><code>${secretLength}</code> characters</dd>
      <dt>Built at</dt><dd>${escape(builtAt)}</dd>
    </dl>
  </body>
</html>
`;

mkdirSync("dist", { recursive: true });
writeFileSync("dist/index.html", html);
console.log("wrote dist/index.html");
