# Koa

A minimal Koa Node.js server with a server-rendered HTML page at `/`, a request-time server timestamp, a JSON endpoint at `/api/hello`, and `public/marker.txt` served at `/marker.txt`. Nitroship detects the `koa` dependency and runs `node server.js` on Compute with production dependencies. The app serves its own static assets; there is no separate CDN directory, Dockerfile, or build step. No secrets or environment variables are required beyond the managed `PORT`; choose a Compute region during deployment.

## Run locally

Requires Node.js 22 or later. From this directory:

```sh
npm ci
npm start
```

Open <http://localhost:3000>. Use `npm run dev` for Node's watch mode. The server binds to `0.0.0.0` and uses `PORT` when set, otherwise `3000`.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy koa --app <app-name>
```

Or use [Deploy on Nitroship](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=koa). Replace `<deployed-host>` with the hostname printed by the CLI:

```sh
curl https://<deployed-host>/
curl https://<deployed-host>/api/hello
curl https://<deployed-host>/marker.txt
```

The HTML contains a fresh server timestamp, the API returns `{ "framework": "koa", "message": "Hello from Koa on Nitroship!", "time": "<ISO timestamp>" }`, and the static asset returns `koa static asset`.
