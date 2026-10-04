# Hugo

A minimal Hugo site with inline layouts, a home page, an About page, and a static SVG. Nitroship detects `hugo.toml` and uses its managed container-static build to publish generated HTML and assets to the CDN. There is no Compute runtime, theme, submodule, custom Dockerfile, or Nitroship build configuration. No environment variables are required.

## Run locally

With Hugo 0.167 or later installed:

```sh
cd hugo
hugo server --bind 127.0.0.1
```

Open <http://localhost:1313/> and <http://localhost:1313/about/>. To inspect a production build, run `hugo` and serve `public/` with a local static server.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy hugo --app <app-name>
```

Replace `https://<deployed-host>` with the resulting URL:

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/about/
curl -fsS https://<deployed-host>/assets/nitroship.svg
```

Expect HTTP 200 with `Hugo on Nitroship`, `Generated once, served from the CDN`, and `Nitroship static asset`, respectively. The home page links to both the About page and the asset. Only generated files are published; there is no server API or SPA fallback.
