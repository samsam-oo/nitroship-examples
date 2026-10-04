# Analog SSR

An official `create-analog` minimal starter configured for SSR, with a server-only page loader, `/api/hello`, and `public/marker.txt`. Nitroship detects `analog`, sets the standard Nitro Node-server preset, runs `dist/analog/server/index.mjs` on Compute, and publishes `dist/analog/public` to the CDN. No Dockerfile or Nitroship-specific build settings are needed. No application environment variables or secrets are required.

## Run locally

Requires Node.js 24 and npm:

```sh
npm ci
npm run dev
```

Open the Vite URL, normally <http://localhost:5173/>. For production:

```sh
BUILD_PRESET=node-server NITRO_PRESET=node-server npm run build
PORT=3000 HOST=0.0.0.0 npm start
```

Open <http://localhost:3000/>.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy analog --app <app-name>
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/marker.txt
```

Choose a Compute region. All requests return HTTP 200. The HTML contains `Analog on Nitroship` and a populated request-time `<time>` before browser JavaScript runs. JSON contains `framework: "analog"`, a greeting and a fresh `serverTime`. The public asset contains `analog static asset`. The page is not prerendered and the example has no persistent state.
