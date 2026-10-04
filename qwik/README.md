# Qwik City SSR

A trimmed official Qwik City starter with the official Express adapter. A `routeLoader$` computes a fresh server timestamp for `/`; `/api/info` returns JSON, and `public/marker.txt` becomes a CDN asset. Nitroship automatically detects `qwik` and packages a Node server.

## Run locally

Requires Node.js 24 and npm. From this directory:

```sh
npm ci
npm start
# Production Express server:
npm run build
PORT=3000 npm run serve
```

Development uses `http://localhost:5173/`; production uses `http://localhost:3000/`. The Express server listens on `0.0.0.0:$PORT`.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy qwik --app <app-name>
```

Choose a Compute region in the deploy form. No application environment variables are required.

Replace `<deployed-host>` with the deployment hostname:

```sh
curl -fsS https://<deployed-host>/
# HTML contains "Qwik on Nitroship" and "Server render time:" plus an ISO timestamp.
curl -fsS https://<deployed-host>/api/info
# {"framework":"qwik","renderedAt":"..."}
curl -fsS https://<deployed-host>/marker.txt
# qwik-public-asset
```

Repeat the page/API requests to observe a new timestamp. This is request-time SSR, not a client-only or static build. Browser assets are served by the CDN; SSR and JSON run on Compute.

Keep `build.server` pointed at `adapters/express/vite.config.ts`. Nitroship packages `server`, `dist`, and the **full installed `node_modules` tree**, including dev dependencies: the official Qwik adapter can import those packages at runtime. Do not production-prune the dependency tree before deployment.

The starter's recommended flat ESLint configuration is included because `qwik build` also runs its lint and type checks. The Express entrypoint explicitly binds to `0.0.0.0` and converts the supplied `PORT` to a numeric TCP port.
