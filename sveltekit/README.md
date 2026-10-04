# SvelteKit SSR

A minimal SvelteKit 3 app with the standard `@sveltejs/adapter-node`, a server-only page loader, `/api/status`, and `/framework.svg`. Nitroship detects `sveltekit`, runs the ordinary build, starts `build/index.js` on Compute and publishes `build/client` to the CDN. No Dockerfile or Nitroship-specific build configuration is needed. No application environment variables or secrets are required.

## Run locally

Requires Node.js 24 and npm:

```sh
npm ci
npm run dev
```

Open <http://localhost:5173/>. For production:

```sh
npm run build
HOST=0.0.0.0 PORT=3000 npm start
```

Open <http://localhost:3000/>. Type synchronization runs in the `dev`, `build` and `check` scripts rather than an install-time `prepare` hook, so production-only dependency installation does not require the development CLI.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy sveltekit --app <app-name>
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/status
curl -fsS https://<deployed-host>/framework.svg
```

Choose a Compute region when deploying. All requests return HTTP 200. The HTML includes `SvelteKit server rendering on Nitroship` and a populated request-time `<time>` without browser JavaScript. JSON contains `framework: "sveltekit"`, `runtime: "node-server"` and a fresh `serverTime`; the SVG contains `SvelteKit CDN asset`. The page and API are uncached request-time responses, not prerendered output. Nitroship supplies `PORT`; the Node adapter listens on all interfaces.
