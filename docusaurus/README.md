# Docusaurus static site

A minimal Docusaurus site with a home page, an About subpage and a public SVG. Nitroship detects `docusaurus` from `package.json`, runs the standard Node build and publishes `build` to the CDN. No Compute region or runtime is needed; these are build-time pages, not SSR or server APIs. No environment variables are required.

The classic starter's docs and blog plugins are disabled. `baseUrl: '/'` serves the site at the domain root; update `url: 'https://example.com'` in `docusaurus.config.js` to your deployed origin for accurate canonical metadata (it does not control where the app is deployed).

## Run locally

Requires Node.js 22 or later. From this directory:

```sh
npm ci
npm run dev
```

Open <http://localhost:3000/>. For generated output, run `npm run build` then `python3 -m http.server 8000 --bind 127.0.0.1 --directory build`. Open `/`, `/about/`, and `/ship.svg` on that server.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy docusaurus --app <app-name>
```

Replace `https://<deployed-host>` with the deployment URL:

```sh
curl -fsS https://<deployed-host>/ | grep 'Nitroship docusaurus home'
curl -fsS https://<deployed-host>/about/ | grep 'Nitroship docusaurus about'
curl -fsS https://<deployed-host>/ship.svg | grep 'Nitroship docusaurus asset'
```

Each request should return HTTP 200 and the indicated marker. The About page is generated HTML and the SVG is copied unchanged to the public output.
