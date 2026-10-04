# Nuxt SSR

A minimal Nuxt app created with the official `nuxi@3.37.0` minimal scaffold. The home page uses `useFetch('/api/status')` during SSR to show a server-computed ISO timestamp in the initial HTML. `/api/status` returns JSON with the framework, runtime, and current server time. `/framework.svg` is a public asset.

## Run locally

Use Node.js 24 and npm. From this directory:

```sh
npm ci
npm run dev
```

Open <http://localhost:3000/>. To run the production Node server instead:

```sh
npm run build
HOST=0.0.0.0 PORT=3000 npm start
```

No application environment variables or secrets are required. `HOST` and `PORT` configure the production listener; Nitroship supplies its runtime port.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy nuxt --app <app-name>
```

Or use [Deploy on Nitroship](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=nuxt). Choose a Compute region on the deployment form. The template intentionally does not pin regions or override framework detection.

Replace `https://<deployed-host>` with the URL printed by the CLI:

```sh
curl -fsS https://<deployed-host>/
curl -i https://<deployed-host>/api/status
curl -i https://<deployed-host>/framework.svg
```

All three requests should return HTTP 200. The page HTML contains `Nuxt server rendering on Nitroship` and a populated `<time>` element without running browser JavaScript. The JSON contains `"framework":"nuxt"`, `"runtime":"node-server"`, and a fresh `serverTime`; the API sends `Cache-Control: no-store`. The SVG contains `Nuxt CDN asset`.

Nitroship detects `nuxt` and builds with `NITRO_PRESET=node-server`. It runs `.output/server/index.mjs` on Compute and publishes `.output/public`, including the SVG and client bundles, to the CDN. This is SSR, not `nuxt generate`; the page and API timestamps are computed at request time, and separate requests can show different times.
