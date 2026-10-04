# Laravel

A trimmed official Laravel 12 skeleton exercising the automatically detected `laravel` **container** preset: FrankenPHP renders a Blade page with the current request time and `/api/hello` on Compute, while `public/style.css` and `public/marker.txt` are extracted to the CDN. There is no Dockerfile or Nitroship-specific build configuration. This example uses plain CSS, so the scaffold's unused Vite setup is removed; the preset also supports a `package.json` build script for apps that keep Vite.

## Run locally

Requires PHP 8.3 and Composer 2. From this directory:

```sh
composer install
export APP_KEY="$(php artisan key:generate --show)"
export APP_URL=http://localhost:3000
php artisan serve --host=0.0.0.0 --port=3000
```

Open `http://localhost:3000/`. No database, migration, Node install, or `.env` file is needed. Sessions default to encrypted cookies (`SESSION_DRIVER=cookie`), the cache to request-local memory (`CACHE_STORE=array`), and queues to synchronous execution (`QUEUE_CONNECTION=sync`). The example has no login, persistent cache, or queued jobs. Choose external services if adding shared durable state. Keep the application key stable so encrypted cookies remain readable.

## Deploy and verify

Generate an application-specific key locally after `composer install`:

```sh
php artisan key:generate --show
```

Then, from the examples repository root:

```sh
ntro deploy laravel --app <app-name>
```

Set `APP_KEY` to that command's output and `APP_URL` to the public HTTPS URL in the app's runtime environment before deploying (or fill the Deploy button form). Laravel's key must be `base64:` plus 32 base64-encoded random bytes; the Deploy form's generic generated value does not have that format, so this template deliberately asks for a key rather than generating one. Never commit it. The preset sets `APP_ENV=production` and `APP_DEBUG=false`.

```sh
curl -i https://<deployed-host>/
# 200, Nitroship Laravel and a server-rendered ISO request time
curl -i https://<deployed-host>/api/hello
# 200 JSON: {"message":"Nitroship Laravel","time":"..."}
curl -i https://<deployed-host>/marker.txt
# 200, Nitroship Laravel CDN asset
curl -i https://<deployed-host>/style.css
# 200 CSS; PHP/Blade source is not exported to the CDN
```

The managed preset installs production Composer dependencies, prepares config/route/view caches at startup, binds `0.0.0.0:$PORT` (default 3000), and places writable `storage/` and `bootstrap/cache/` under `/tmp/nitroship`. That state is ephemeral, not shared across instances. Store uploads in S3 or another object store. Nitroship does not run database migrations, queue workers, or schedulers automatically.
