# WordPress

Stock WordPress 7.1.2 core with a tiny server-rendered theme, a must-use REST greeting plugin, and a static theme marker. Nitroship detects `wp-includes/` and `wp-config.php` and uses its managed WordPress FrankenPHP container on Compute; public browser assets are extracted to the CDN. Core is committed because this preset packages an existing root installation: a smaller Composer-installed core layout would not satisfy detection or the root document-directory contract. There is no Dockerfile, Composer dependency install, or Nitroship-specific build configuration.

## Run locally

Requires PHP 8.3 with mysqli and an existing MySQL/MariaDB database. Set `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `WP_HOME=http://localhost:3000` in your process environment. Set all eight keys/salts below; generate each separately with `php -r 'echo bin2hex(random_bytes(32));'` and keep them stable. From this directory:

```sh
php -S 0.0.0.0:3000
```

Open <http://localhost:3000/wp-admin/install.php> and finish the standard WordPress installation, choosing the admin credentials yourself. The `nitroship` theme is the configured default. The page at `/` shows a request-time UTC timestamp. Use the query-form REST URL below without configuring pretty permalinks.

## Deploy and verify

Provision an external MySQL-compatible database first; Nitroship does not create it. Fill the deploy form with `DB_HOST`, `DB_NAME`, `DB_USER`, secret `DB_PASSWORD`, and your public HTTPS `WP_HOME`. `wp-config.php` explicitly maps these values to WordPress constants and sets `WP_SITEURL` to `WP_HOME`. The eight generated secret fields are `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, `AUTH_SALT`, `SECURE_AUTH_SALT`, `LOGGED_IN_SALT`, and `NONCE_SALT`. Each generic generated value contains 32 random bytes and is suitable here; preserve them across deployments. For CLI deployment, generate and set those secrets separately. Never commit credentials.

From the examples repository root, choose Compute regions during deployment:

```sh
ntro deploy wordpress --app <app-name>
```

Visit `https://<deployed-host>/wp-admin/install.php` to finish the first installation. Then:

```sh
curl -fsS https://<deployed-host>/
curl -fsS 'https://<deployed-host>/?rest_route=/nitroship/v1/hello'
curl -fsS https://<deployed-host>/wp-content/themes/nitroship/marker.txt
```

Expect `Nitroship WordPress` and a fresh timestamp in the page, JSON with `message: "Nitroship WordPress API"` and `requestTime`, and `Nitroship WordPress static asset` in the asset. PHP source is excluded from CDN extraction. FrankenPHP binds `0.0.0.0:$PORT`, defaulting to `3000`.

Uploads are writable only under ephemeral `/tmp/nitroship/uploads`, not durable or shared. Configure an S3/object-storage offload plugin before uploading media; runtime uploads do not become build-time CDN assets. Theme/plugin/core updates must be committed and redeployed; dashboard editing and updates are disabled. Use the external database for persistent content. Nitroship runs no migrations, workers, or scheduler; WordPress's request-triggered WP-Cron is only application behavior.
