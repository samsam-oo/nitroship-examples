# VitePress static site

A minimal VitePress site with a home page, an About subpage and a public SVG. Nitroship detects `vitepress` from `package.json`, runs the standard Node build and publishes `.vitepress/dist` to the CDN. No Compute region or runtime is needed; these are build-time pages, not SSR or server APIs. No environment variables are required. The VitePress configuration excludes this repository README from site content.

## Run locally

Requires Node.js 22 or later. From this directory:

```sh
npm ci
npm run dev
```

Open <http://localhost:5173/>. For generated output, run `npm run build` then `python3 -m http.server 8000 --bind 127.0.0.1 --directory .vitepress/dist`. Open `/`, `/about.html`, and `/ship.svg` on that server.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy vitepress --app <app-name>
```

Replace `https://<deployed-host>` with the deployment URL:

```sh
curl -fsS https://<deployed-host>/ | grep 'Nitroship vitepress home'
curl -fsS https://<deployed-host>/about.html | grep 'Nitroship vitepress about'
curl -fsS https://<deployed-host>/ship.svg | grep 'Nitroship vitepress asset'
```

Each request should return HTTP 200 and the indicated marker. The About page is generated HTML and the SVG is copied unchanged to the public output.
