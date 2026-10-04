# SolidStart

An official `create-solid` SolidStart v2 starter, trimmed to a server-rendered page, a JSON API and a public asset. The page's timestamp is computed in a server-only query on each request. The Vite configuration includes the official `nitro/vite` integration required by Nitroship's SolidStart preset.

## Run locally

Requires Node.js 24 or later.

```sh
cd solidstart
npm ci
npm run dev
```

Open <http://localhost:3000> (or the URL Vite prints). To run the production Node server:

```sh
NITRO_PRESET=node-server npm run build
PORT=3000 npm start
```

## Deploy and verify

From the examples repository root:

```sh
ntro deploy solidstart --app <app-name>
```

Or use [Deploy on Nitroship](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=solidstart). Choose a Compute region in the deploy form. No environment variables or secrets are required. Nitroship detects `@solidjs/start`, sets `NITRO_PRESET=node-server`, runs the `.output` Node server and publishes `.output/public` to the CDN.

Replace `<deployed-host>` with the deployed hostname:

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/marker.txt
```

All three should return HTTP 200. The HTML contains `SolidStart on Nitroship` and an ISO timestamp after `Server-rendered at` without requiring JavaScript. The JSON contains `"framework":"solidstart"` and a request-time `serverTime`. The public asset contains `SolidStart public asset on Nitroship`. Repeat the page/API requests to see the server timestamps change. This example has no persistence or external services.
