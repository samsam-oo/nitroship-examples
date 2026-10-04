# Hono

A small Hono app using the standard `@hono/node-server` adapter, with request-time HTML at `/`, JSON at `/api/hello`, and a static asset at `/marker.txt`. Nitroship detects both dependencies as the `hono` node-server preset and runs its Node bundle on Compute. Hono serves its own assets; this preset has no separate CDN output. No Dockerfile, build overrides, application environment variables or secrets are required.

## Run locally

Requires Node.js 22 or newer:

```sh
npm ci
npm start
```

Open <http://localhost:3000/>. The server binds to `0.0.0.0` and reads `PORT` (default `3000`).

## Deploy and verify

From the examples repository root:

```sh
ntro deploy hono --app <app-name>
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/marker.txt
```

Choose a Compute region when deploying. All requests return HTTP 200. The page contains `Hono on Nitroship` and a request-time ISO timestamp. JSON contains `framework: "hono"`, a greeting and a fresh `time`; the asset returns `hono static asset`. There is no persistent state.
