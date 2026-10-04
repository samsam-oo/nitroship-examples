# Create React App

A small legacy Create React App project with an interactive counter, a nested `/about/demo` page and `public/marker.txt`. Nitroship detects the `react-scripts` dependency as `create-react-app`, builds `build`, and publishes its files to the CDN with SPA fallback. No Compute, server APIs, environment variables or secrets are required. Create React App is deprecated upstream; this example demonstrates deployment of existing projects, not a recommendation for new applications.

## Run locally

Requires Node.js 22 or 24 and npm.

```sh
npm ci
npm start
```

Open <http://localhost:3000/> or `/about/demo` and click the counter. `npm run build` creates the production site in `build`.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy create-react-app --app <app-name>
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/about/demo
curl -fsS https://<deployed-host>/marker.txt
```

All three return HTTP 200. The first two return the same HTML shell titled `Create React App on Nitroship`; browser JavaScript renders the home or nested page. The asset returns `create-react-app static asset`, not the fallback HTML. Open the nested URL directly in a browser and click the counter. Never include secrets in browser-visible configuration.
