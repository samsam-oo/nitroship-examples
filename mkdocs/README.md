# MkDocs

A minimal MkDocs documentation site with a home page, an About page, and a static SVG. Nitroship detects `mkdocs.yml` and uses its managed container-static build to publish generated HTML and assets to the CDN. The standard MkDocs theme supplies navigation and search; no additional plugins, Compute runtime, custom Dockerfile, or Nitroship build configuration are needed. No environment variables are required.

## Run locally

With Python 3.14 installed:

```sh
cd mkdocs
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
mkdocs serve --dev-addr 127.0.0.1:8000
```

Open <http://localhost:8000/> and <http://localhost:8000/about/>. To inspect a production build, run `mkdocs build` and serve `site/` with a local static server.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy mkdocs --app <app-name>
```

Replace `https://<deployed-host>` with the resulting URL:

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/about/
curl -fsS https://<deployed-host>/assets/nitroship.svg
```

Expect HTTP 200 with `MkDocs on Nitroship`, `Generated once, served from the CDN`, and `Nitroship static asset`, respectively. The home page links to both the About page and the asset. Only generated files are published; there is no server API or SPA fallback.
