# Astro standalone SSR

An official `create-astro` minimal scaffold, trimmed to show Astro's `@astrojs/node` standalone adapter. `/` computes a timestamp on every server render; `/api/info` computes JSON on the server. `/about/` is explicitly prerendered at build time. The public stylesheet and prerendered HTML are published from `dist/client` to Nitroship's CDN, while the Node entrypoint handles SSR and the API.

## Run locally

Use Node.js 22.12+ (Node.js 24 recommended).

```sh
cd astro
npm ci
npm run dev
```

Open `http://localhost:4321/`, `/api/info`, and `/about/`. To run the standalone production server:

```sh
npm run build
HOST=0.0.0.0 PORT=3000 npm start
```

Open `http://localhost:3000/`. No application environment variables or secrets are required. Nitroship supplies the managed server's `PORT`.

## Deploy and verify

From the repository root:

```sh
ntro deploy astro --app <app-name>
```

Or use [Deploy on Nitroship](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=astro). Nitroship detects `astro` and Node server output from the adapter configuration; choose a Compute region in the deployment form.

Replace `https://<deployed-host>` with the deployment URL:

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/info
curl -fsS https://<deployed-host>/about/
curl -fsS https://<deployed-host>/example.css
```

Expect `Astro on Nitroship` and a `Server rendered at` timestamp in the home HTML; JSON with `framework: "astro"`, `message: "Hello from the Astro server"`, and `generatedAt`; `Astro prerendered page` with a build timestamp; and the stylesheet marker `Nitroship Astro public asset`. Repeat the home/API requests: their timestamps change, but the prerendered page's timestamp stays fixed until the next build.
