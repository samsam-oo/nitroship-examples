# Angular SSR

A trimmed official Angular CLI starter using `@angular/ssr`. `/` is rendered on every request with a server-computed ISO timestamp, preserved during hydration with Angular's transfer state. Express serves `/api/info`; `public/marker.txt` is published to the CDN. Nitroship automatically detects `angular` and packages a Node server.

## Run locally

Requires Node.js 24 and npm. From this directory:

```sh
npm ci
npm start
# Production SSR:
npm run build
PORT=3000 NG_ALLOWED_HOSTS=localhost,127.0.0.1 npm run serve:ssr:angular
```

The dev server uses `http://localhost:4200/`; production uses `http://localhost:3000/`. The production server binds to `0.0.0.0:$PORT`.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy angular --app <app-name>
```

Choose a Compute region in the deploy form. No application environment variables are required. Nitroship defaults `NG_ALLOWED_HOSTS` to `*` when unset because its edge validates domain bindings. If you explicitly set that variable, its comma-separated hostname allowlist is preserved: include every deployment and custom hostname.

Replace `<deployed-host>` with the deployment hostname:

```sh
curl -fsS https://<deployed-host>/
# HTML contains "Angular on Nitroship" and "Server render time:" plus an ISO timestamp.
curl -fsS https://<deployed-host>/api/info
# {"framework":"angular","renderedAt":"..."}
curl -fsS https://<deployed-host>/marker.txt
# angular-public-asset
```

Repeat the page/API requests to observe a new timestamp. This is request-time SSR, not a prerendered static page. Browser assets are served by the CDN; SSR and JSON run on Compute.
