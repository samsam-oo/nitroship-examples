# Jekyll

A minimal Jekyll site with a home page, an About page, and a static SVG. Nitroship detects `_config.yml` and the Jekyll Gemfile dependency, then uses its managed container-static build to publish generated HTML and assets to the CDN. There is no Compute runtime, theme, custom Dockerfile, or Nitroship build configuration. No environment variables are required.

## Run locally

With Ruby 4.0 and Bundler installed:

```sh
cd jekyll
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open <http://localhost:4000/> and <http://localhost:4000/about/>. To inspect a production build, run `JEKYLL_ENV=production bundle exec jekyll build` and serve `_site/` with a local static server.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy jekyll --app <app-name>
```

Replace `https://<deployed-host>` with the resulting URL:

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/about/
curl -fsS https://<deployed-host>/assets/nitroship.svg
```

Expect HTTP 200 with `Jekyll on Nitroship`, `Generated once, served from the CDN`, and `Nitroship static asset`, respectively. The home page links to both the About page and the asset. Only generated files are published; there is no server API or SPA fallback.
