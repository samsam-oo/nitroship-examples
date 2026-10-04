# Remix v2 Vite SSR

An official `create-remix` v2 scaffold, trimmed to show server rendering with Vite. The home route's loader computes a timestamp on the server for each request. `/api/info` is a JSON resource route. Nitroship runs `remix-serve build/server/index.js` on Compute and publishes `build/client`, including the public stylesheet, to the CDN. This is Remix v2, not React Router framework mode.

## Run locally

Use Node.js 20+ (Node.js 24 recommended).

```sh
cd remix
npm ci
npm run dev
```

Open `http://localhost:5173/` and `/api/info`. For the production build:

```sh
npm run build
HOST=0.0.0.0 PORT=3000 npm start
```

Open `http://localhost:3000/`. No application environment variables or secrets are required. Nitroship supplies the managed server's `PORT`.

## Deploy and verify

From the repository root:

```sh
ntro deploy remix --app <app-name>
```

Or use [Deploy on Nitroship](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=remix). Nitroship detects the `remix` Node server preset from `@remix-run/dev`; choose a Compute region in the deployment form. Runtime dependencies, including `@remix-run/serve`, are in production `dependencies`.

Replace `https://<deployed-host>` with the deployment URL:

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/info
curl -fsS https://<deployed-host>/example.css
```

Expect `Remix on Nitroship` and a `Server rendered at` timestamp in the home HTML; JSON with `framework: "remix"`, `message: "Hello from the Remix server"`, and `generatedAt`; and the stylesheet marker `Nitroship Remix public asset`. Repeat the home/API requests to see new timestamps computed on the server, rather than client-only rendering.
