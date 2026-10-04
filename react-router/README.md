# React Router SSR

An official `create-react-router` framework-mode scaffold, trimmed to one SSR page and a JSON resource route. The home page's loader computes an ISO timestamp on the server for each request; `/api/info` returns `framework` and `serverTime` as JSON. `public/example.svg` is deployed to the CDN. No environment variables or external services are required.

## Run locally

Requires Node.js 22.12+ (Node.js 24 recommended).

```sh
cd react-router
npm ci
npm run dev
```

Open <http://localhost:5173>. To run the production server:

```sh
npm run build
PORT=3000 HOST=0.0.0.0 npm start
```

Open <http://localhost:3000>. SSR is enabled in `react-router.config.ts`; `@react-router/serve` is a production dependency.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy react-router --app <app-name>
```

Or use [Deploy on Nitroship](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=react-router). Nitroship automatically detects `react-router`, packages the server and production dependencies, and publishes `build/client` to the CDN. Choose a Compute region on the deployment page; this template does not pin one.

Replace `<deployed-host>` with the deployment hostname:

```sh
curl -i https://<deployed-host>/
curl -i https://<deployed-host>/api/info
curl -i https://<deployed-host>/example.svg
```

All three requests should return HTTP 200. The HTML contains `React Router on Nitroship` and `Server time:` followed by an ISO timestamp even without JavaScript. The JSON contains `"framework":"react-router"` and a fresh `serverTime`. The SVG contains `Nitroship` and is served as a public asset. Repeat the page or JSON request to see the server timestamp change.
