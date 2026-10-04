# PHP

A dependency-free Composer project with `public/index.php` rendering request-time HTML at `/` and JSON at `/api/hello`, plus a public stylesheet. Nitroship detects `composer.json`, installs production dependencies, and serves the `public/` document root using the managed PHP FrankenPHP container on Compute. Allowed browser assets are extracted to the CDN; `index.php` stays private to the runtime. No custom Dockerfile, Nitroship build configuration, secrets, or custom environment variables are needed.

## Run locally

Requires PHP 8.4 or later and Composer. From this directory:

```sh
composer install
php -S 0.0.0.0:3000 -t public
```

Open <http://localhost:3000/>. PHP's development server serves existing public files and sends application routes to `index.php`. The managed FrankenPHP server binds `0.0.0.0:$PORT`, defaulting to `3000`.

## Deploy and verify

From the examples repository root, choose Compute regions during deployment:

```sh
ntro deploy php --app <app-name>
```

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/site.css
```

Expect `PHP on Nitroship` in the page, JSON with `framework: "php"`, `message: "Hello from PHP Compute"` and a request-time UTC `serverTime`, and `php-cdn-asset` in the stylesheet. This example has no writable state, sessions, database, migrations, or background workers.
