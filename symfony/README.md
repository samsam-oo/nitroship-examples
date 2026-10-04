# Symfony

[![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=symfony)

A small real Symfony 7.4 application from the official `symfony/skeleton` Composer project, with `symfony/twig-bundle` added. PHP is pinned to the 8.3 series. `/` renders a Twig page with the current server request time in UTC, `/api/hello` returns JSON, and `/marker.txt` is a static CDN asset. No database, frontend build, or Dockerfile is needed.

## Run locally

Install PHP 8.3 with the standard Symfony extensions (including Ctype, iconv, Session, SimpleXML, and Tokenizer) and Composer 2. From this directory:

```sh
export APP_ENV=prod
export APP_DEBUG=0
export APP_RUNTIME_OPTIONS='{"disable_dotenv":true}'
export APP_SECRET="$(php -r 'echo bin2hex(random_bytes(32));')"
export DEFAULT_URI=http://localhost:8000
composer install --no-dev --no-scripts
php bin/console cache:warmup
php -S 127.0.0.1:8000 -t public
```

Open `http://localhost:8000/`. This uses PHP's development server; it is not a production server. Reload the page to see a new server timestamp. Check the other endpoints:

```sh
curl -fsS http://localhost:8000/api/hello
curl -fsS http://localhost:8000/marker.txt
```

The example deliberately has no committed dotenv files. Supply variables in the process environment, including when running Composer auto-scripts or console commands. The local secret above is generated on your machine, not committed.

## Deploy and verify

Set these runtime variables in the deploy form or the app's Environment settings before deployment:

- `APP_SECRET`: a stable generated secret. The template generates and hides it; keep it stable across deployments and never publish it. For CLI deployment, generate a secret separately and set it in the app's Environment settings.
- `DEFAULT_URI`: your application's public **HTTPS** URL. `framework.router.default_uri` reads it for URL generation outside HTTP requests. Use your intended app URL or custom domain, not the local development URL.

The managed preset supplies `APP_ENV=prod`, disables debug mode and dotenv loading, installs production Composer dependencies without scripts, and warms the cache at startup with runtime variables available. Nitroship detects Symfony from `bin/console` and `symfony/framework-bundle`; no explicit framework or region is pinned in this example. Select a compute region in the deployment UI/app settings.

From the examples repository root:

```sh
ntro deploy symfony --app <app-name>
```

Replace the host below with your deployed URL:

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/marker.txt
```

Expect the home page to contain `Nitroship Symfony` and a request timestamp, the API to return `message: "Nitroship Symfony"` and `requestTime`, and the asset to contain `Nitroship Symfony static CDN marker`. The page and API execute on managed FrankenPHP compute; `public/marker.txt` is extracted into the CDN at build time.

## Ephemeral runtime storage

The managed container runs as a non-root user with a read-only application filesystem. Nitroship redirects Symfony's `var/` to writable `/tmp/nitroship/var`; cache warmup and Twig compilation write there. Cache, logs, and any file sessions are ephemeral, isolated per instance, and lost on replacement. This example stores no user data and does not use a database. For a real app, use external services for durable/shared sessions, uploads, cache, and logs rather than `var/`, `public/`, or `/tmp`.

See the [Symfony preset guide](https://nitroship.co/docs/frameworks/symfony) and [Symfony 7.4 setup documentation](https://symfony.com/doc/7.4/setup.html).
