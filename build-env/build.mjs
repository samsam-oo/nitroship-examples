// Renders dist/index.html from build-time environment variables.
// API_SECRET is never written to the page; only whether it was provided.
import { mkdirSync, writeFileSync } from "node:fs";

const escape = (value) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const greeting = process.env.GREETING ?? "(GREETING not set)";
const secretStatus = process.env.API_SECRET ? `set (${process.env.API_SECRET.length} characters)` : "not set";
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
    <h1>${escape(greeting)}</h1>
    <p>Built by <code>node build.mjs</code> in the Nitroship builder and served from <code>dist/</code>.</p>
    <dl>
      <dt>GREETING</dt><dd><code>${escape(greeting)}</code></dd>
      <dt>API_SECRET</dt><dd>${secretStatus}</dd>
      <dt>Built at</dt><dd>${builtAt}</dd>
    </dl>
  </body>
</html>
`;

mkdirSync("dist", { recursive: true });
writeFileSync("dist/index.html", html);
console.log(`wrote dist/index.html (GREETING=${JSON.stringify(greeting)}, API_SECRET ${secretStatus})`);
