# NestJS

A trimmed official `nest new` app exercising the auto-detected `nestjs` **node-server** preset. Nest compiles TypeScript to `dist/main.js`; the managed Node bundle runs on Compute and renders a fresh request timestamp at `/`, returns JSON at `/api/hello`, and serves `public/marker.txt`. This preset does not split assets onto the CDN: `/marker.txt` is served by Nest on Compute. No Dockerfile or Nitroship-specific build settings are needed.

## Run locally

Use Node.js 22 or newer:

```sh
npm ci
npm run build
npm start
```

Open `http://localhost:3000/`. `PORT` defaults to `3000`; the server binds to `0.0.0.0`.

## Deploy and verify

```sh
ntro deploy nestjs --app <app-name>
```

Replace `https://<deployed-host>` with the deployment URL:

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/marker.txt
```

Expect `NestJS on Nitroship` and a request timestamp in the page, JSON with `"framework":"nestjs"` and a fresh `time`, and `nestjs static asset`. No application environment variables are required; Nitroship supplies `PORT`. There is no persistent state.
