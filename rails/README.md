# Rails

A trimmed official Rails 8.1 skeleton without Active Record or a database: ERB renders a request-time page at `/`, `/api/hello` returns JSON, and Propshaft precompiles the stylesheet into `public/assets/`. Nitroship detects `Gemfile` and `config/application.rb`, installs gems and precompiles assets using its managed Rails container preset, runs Puma on Compute, and extracts public assets to the CDN. No Nitroship build configuration is needed. The Rails-generated Dockerfile is deliberately absent: it would take precedence over automatic preset detection and normally listen on port 80 instead of the managed port.

## Run locally

Requires Ruby 3.4 and Bundler. From this directory:

```sh
bundle install
export SECRET_KEY_BASE="$(ruby -rsecurerandom -e 'puts SecureRandom.hex(64)')"
bin/rails server --binding 0.0.0.0 --port 3000
```

Open <http://localhost:3000/>. Assets compile on demand in development. No database, credentials file, migrations, queue worker, or installed gems are committed. Rails's generated `bin/rails` and `bin/rake` launchers are source files, not build output.

## Deploy and verify

Set a stable secret `SECRET_KEY_BASE` using the generation command above (128 hex characters). The generic Deploy form generator produces only 43 characters, so this template asks for the Rails key rather than generating an unsuitable value. Keep it across deployments. From the examples repository root, choose Compute regions during deployment:

```sh
ntro deploy rails --app <app-name>
```

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/icon.svg
```

Expect `Hello Rails from Nitroship` and the request-time UTC timestamp in the HTML, JSON containing the same `message`, `framework: "Rails"` and `time`, and the SVG icon. Copy the fingerprinted `/assets/application-<digest>.css` URL from the returned HTML and curl that URL too; it is precompiled and served from the CDN along with `icon.svg`. Only public files are extracted, never Ruby source. Puma binds `0.0.0.0:$PORT`, defaulting to `3000`.

The managed runtime redirects temporary/log/storage paths under `/tmp/rails` and logs to stdout. Local state is ephemeral and unshared; use external databases and object storage if adding persistence or uploads. Nitroship does not automatically run migrations, workers, or schedulers.
