# TanStack Start SSR

An official TanStack CLI blank React scaffold with the Nitro deployment integration. The home page's loader calls a server function that computes an ISO timestamp on each request. `/api/info` is a JSON server route returning `framework` and `serverTime`. `public/example.svg` is published to the CDN. No environment variables or external services are required.

## Run locally

Requires Node.js 22.12+ (Node.js 24 recommended).

```sh
cd tanstack-start
npm ci
npm run dev
```

Open <http://localhost:3000>. For the production Node server:

```sh
NITRO_PRESET=node-server npm run build
PORT=3000 HOST=0.0.0.0 npm start
```

The Vite configuration includes both `tanstackStart()` and `nitro()` imported from `nitro/vite`. The Nitro adapter emits a runnable `.output/server/index.mjs`, rather than only an SSR request handler. Vite generates the file-route tree during development/build; it is not checked in.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy tanstack-start --app <app-name>
```

Or use [Deploy on Nitroship](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=tanstack-start). Nitroship detects `tanstack-start`, sets `NITRO_PRESET=node-server` for the build, bundles `.output`, and serves `.output/public` from the CDN. Choose a Compute region on the deployment page; the template does not pin one.

Replace `<deployed-host>` with the deployment hostname:

```sh
curl -i https://<deployed-host>/
curl -i https://<deployed-host>/api/info
curl -i https://<deployed-host>/example.svg
```

All three requests should return HTTP 200. The HTML contains `TanStack Start on Nitroship` and `Server time:` followed by an ISO timestamp even without JavaScript. The JSON contains `"framework":"tanstack-start"` and a fresh `serverTime`. The SVG contains `Nitroship`. Repeat the page or JSON request to see the server timestamp change.
