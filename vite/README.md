# Vite React SPA

A small Vite React app with an interactive counter, a nested `/about/demo` page, and `public/marker.txt`. Nitroship detects `vite`, runs the standard build, and publishes `dist` to the CDN with a single-page fallback. There is no Compute server, SSR, or API. No environment variables or secrets are required.

## Run locally

Requires Node.js 22.12+ or 24+.

```sh
npm ci
npm run dev
```

Open <http://localhost:5173/> and `/about/demo`, then click the counter. For the production build, run `npm run build && npm run preview` and open <http://localhost:4173/>.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy vite --app <app-name>
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/about/demo
curl -fsS https://<deployed-host>/marker.txt
```

All three return HTTP 200. The first two serve the same built HTML shell titled `Vite on Nitroship`; browser JavaScript renders the correct page and counter. The asset returns `vite static asset`, not the HTML fallback. Open the nested URL directly in a browser and click the counter to verify client interactivity. Never put secrets in client-visible environment variables.
