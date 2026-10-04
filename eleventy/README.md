# Eleventy static site

A minimal Eleventy site with a home page, an About subpage and a public SVG. Nitroship detects `eleventy` from `package.json`, runs the standard Node build and publishes `_site` to the CDN. No Compute region or runtime is needed; these are build-time pages, not SSR or server APIs. No environment variables are required.

## Run locally

Requires Node.js 22 or later. From this directory:

```sh
npm ci
npm run dev
```

Open <http://localhost:8080/>. For generated output, run `npm run build` then `python3 -m http.server 8000 --bind 127.0.0.1 --directory _site`. Open `/`, `/about/`, and `/ship.svg` on that server.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy eleventy --app <app-name>
```

Replace `https://<deployed-host>` with the deployment URL:

```sh
curl -fsS https://<deployed-host>/ | grep 'Nitroship eleventy home'
curl -fsS https://<deployed-host>/about/ | grep 'Nitroship eleventy about'
curl -fsS https://<deployed-host>/ship.svg | grep 'Nitroship eleventy asset'
```

Each request should return HTTP 200 and the indicated marker. The About page is generated HTML and the SVG is copied unchanged to the public output.
