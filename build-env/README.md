# Build-time environment

`nitroship.json` runs `node build.mjs` and deploys the generated `dist/` page. The deploy form asks for a greeting, URL, page size, theme, and banner setting, and generates a secret. The page shows the secret's length only.

## Run locally

From this directory:

```sh
GREETING='Hello locally' SITE_URL='https://example.com' PAGE_SIZE=20 THEME=dark SHOW_BANNER=true API_SECRET='local-example-only' node build.mjs
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000/ in a browser. Stop the server with Ctrl-C. Without explicit variables, the build uses the same public defaults as the deploy form; the secret length is zero.

## Deploy

From the examples repository root, after `ntro login`:

```sh
ntro apps create my-build-env
ntro deploy build-env --app my-build-env
```

Or use the [Deploy on Nitroship form](https://nitroship.co/new/deploy?repo=samsam-oo/nitroship-examples&dir=build-env) to enter the variables and generate a secret. Visit the deployed URL, confirm all five public values and the secret length are displayed, and confirm the secret value is not visible in page source.

Environment values are baked into static HTML at build time, not read per request. Changing them requires another build/deployment. Do not put private values in the five displayed fields; even the generated secret's length is public.
