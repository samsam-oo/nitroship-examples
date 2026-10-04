# Nitroship examples

Small apps for trying [Nitroship](https://nitroship.co) and its **Deploy on Nitroship** button.
Each directory is an independent app; the button's `dir` parameter selects it. Each directory's
README explains what it exercises and how to test it against the deployed URL.

## Static sites and generators (CDN-only)

| Example | What it exercises | Deploy |
|---|---|---|
| [`static`](static) | Plain HTML with clean URLs (`/about` serves `about.html`) | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=static) |
| [`build-env`](build-env) | Custom build/output directory, typed template variables, and a hidden generated secret | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=build-env) |
| [`static-images`](static-images) | Edge IPX image resizing, format conversion, and a remote image allowlist | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=static-images) |
| [`vite`](vite) | Vite React counter and nested client route with SPA fallback | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=vite) |
| [`create-react-app`](create-react-app) | Legacy Create React App counter and nested route with SPA fallback | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=create-react-app) |
| [`eleventy`](eleventy) | Build-time home/About pages and a public SVG with Eleventy | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=eleventy) |
| [`vitepress`](vitepress) | Build-time home/About documentation pages and a public SVG | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=vitepress) |
| [`docusaurus`](docusaurus) | Minimal Docusaurus home/About pages without docs/blog plugins | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=docusaurus) |
| [`gatsby`](gatsby) | Build-time Gatsby home/About pages and a public SVG | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=gatsby) |
| [`hugo`](hugo) | Managed container-static Hugo home/About pages and an SVG, without a theme | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=hugo) |
| [`jekyll`](jekyll) | Managed container-static Jekyll home/About pages and an SVG | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=jekyll) |
| [`mkdocs`](mkdocs) | Managed container-static MkDocs pages, navigation, search, and an SVG | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=mkdocs) |

## Next.js and custom Docker (Compute)

| Example | What it exercises | Deploy |
|---|---|---|
| [`next-websocket`](next-websocket) | Next.js instance-local WebSocket chat, presence, latency, and reconnects | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=next-websocket) |
| [`next-sse`](next-sse) | Next.js resumable SSE, chunked text, and Suspense-streamed SSR | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=next-sse) |
| [`next-isr-cron`](next-isr-cron) | Next.js ISR, SSR, tag invalidation, cron, proxy rules, and image optimization | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=next-isr-cron) |
| [`docker-realtime`](docker-realtime) | Dockerfile WebSocket echo/broadcast, SSE replay, and custom port/health probe | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=docker-realtime) |

## Managed JavaScript SSR (Compute + CDN assets)

| Example | What it exercises | Deploy |
|---|---|---|
| [`nuxt`](nuxt) | Nuxt SSR using a server API timestamp and a public SVG | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=nuxt) |
| [`sveltekit`](sveltekit) | SvelteKit adapter-node SSR, server-only loader, JSON, and public SVG | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=sveltekit) |
| [`astro`](astro) | Astro standalone SSR, JSON API, and a prerendered About page | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=astro) |
| [`react-router`](react-router) | Framework-mode React Router SSR loader, JSON resource route, and SVG | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=react-router) |
| [`remix`](remix) | Remix v2 Vite SSR loader, JSON resource route, and client stylesheet | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=remix) |
| [`solidstart`](solidstart) | SolidStart server-only timestamp query, JSON API, and Nitro integration | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=solidstart) |
| [`tanstack-start`](tanstack-start) | TanStack Start SSR server function, JSON route, and Nitro integration | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=tanstack-start) |
| [`analog`](analog) | Analog SSR with a server-only loader, JSON API, and public marker | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=analog) |
| [`angular`](angular) | Angular request-time SSR with transfer state, Express JSON, and public marker | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=angular) |
| [`qwik`](qwik) | Qwik City Express SSR with routeLoader, JSON, and public marker | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=qwik) |

## Managed Node servers (Compute, including assets)

| Example | What it exercises | Deploy |
|---|---|---|
| [`express`](express) | Express request-time HTML, JSON greeting, and application-served static marker | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=express) |
| [`nestjs`](nestjs) | NestJS TypeScript server with request-time HTML, JSON, and static marker | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=nestjs) |
| [`fastify`](fastify) | Fastify ESM plugin app with HTML, JSON, and @fastify/static marker | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=fastify) |
| [`hono`](hono) | Hono Node adapter with request-time HTML, JSON, and static marker | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=hono) |
| [`koa`](koa) | Koa request-time HTML, JSON greeting, and static marker | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=koa) |

## Managed compiled servers (Compute; public assets on CDN unless noted)

| Example | What it exercises | Deploy |
|---|---|---|
| [`go`](go) | Standard-library Go HTTP server with request-time HTML, JSON, and public CSS | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=go) |
| [`rust`](rust) | Dependency-free Cargo HTTP demonstration with HTML, JSON, and public CSS | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=rust) |
| [`dotnet`](dotnet) | ASP.NET Core request-time HTML, JSON, and published wwwroot stylesheet | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=dotnet) |
| [`spring-boot`](spring-boot) | Initializr Maven web app with HTML, JSON, and JAR-packaged CSS on Compute | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=spring-boot) |

## Managed Python, PHP, Ruby, and Elixir (Compute + CDN assets)

| Example | What it exercises | Deploy |
|---|---|---|
| [`fastapi`](fastapi) | FastAPI/Uvicorn request-time HTML, JSON, and public stylesheet | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=fastapi) |
| [`flask`](flask) | Flask/Gunicorn Jinja-rendered HTML, JSON, and public stylesheet | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=flask) |
| [`django`](django) | Database-free Django/Gunicorn views, JSON, and prefix-preserving collected static files | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=django) |
| [`php`](php) | Composer PHP front controller with HTML, JSON, and a public stylesheet | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=php) |
| [`laravel`](laravel) | Database-free Laravel Blade page, JSON API, cookie sessions, and public assets | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=laravel) |
| [`symfony`](symfony) | Symfony Twig page, JSON API, runtime cache warmup, and public marker | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=symfony) |
| [`wordpress`](wordpress) | Stock WordPress with external MySQL, a server-rendered theme, REST API, and theme assets | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=wordpress) |
| [`rails`](rails) | Database-free Rails ERB page, JSON API, and Propshaft-precompiled CSS | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=rails) |
| [`phoenix`](phoenix) | Phoenix Elixir release with HEEx, JSON, and Tailwind/esbuild CDN assets | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=phoenix) |

## Add the button to your own repository

```markdown
[![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=<owner>/<repo>&ref=<branch>&dir=<subdirectory>)
```

`ref` and `dir` are optional. Describe the deploy form with a `template` block in `<dir>/nitroship.json`:

```json
{
  "build": { "command": "node build.mjs", "outputDirectory": "dist" },
  "template": {
    "name": "My app",
    "description": "Shown on the deploy page",
    "env": [
      { "key": "GREETING", "description": "Text on the page", "required": true, "default": "Hello" },
      { "key": "SITE_URL", "type": "url", "default": "https://example.com" },
      { "key": "PAGE_SIZE", "type": "number", "default": "20" },
      { "key": "THEME", "type": "enum", "options": ["light", "dark"], "default": "light" },
      { "key": "API_SECRET", "type": "string", "generated": true, "secret": true }
    ]
  }
}
```

- `required: true` makes a variable mandatory; `secret: true` stores it encrypted and hides it.
- `type` is `string` (default), `number`, `url` or `enum`; `enum` needs `options`. Values are always
  submitted as strings; use `enum` with `["true", "false"]` for a boolean.
- `generated: true` pre-fills an editable random value (`string` only, no `default`). It is **not**
  secret by itself; add `secret: true` to hide it. The old `"generate": "secret"` field is rejected.
- `build.installCommand` / `build.command` replace detected install/build commands where supported;
  `build.outputDirectory` selects static output where supported. Detection order is explicit
  `build.framework` → configured Dockerfile / `Dockerfile.nitroship` / `Dockerfile` → Next.js →
  highest-priority framework preset → generic static. `build.framework` overrides an automatically
  found Dockerfile and cannot coexist with `build.dockerfile`.

Next.js, Dockerfile apps, managed Node-server presets, and managed container-server presets run
on Compute; their supported public assets can be split onto the CDN. Static and container-static
presets publish files to the CDN only, with no Compute runtime. See the
[framework guides](https://docs.nitroship.co/frameworks/nextjs/) for each preset's contract.
For Compute apps, choose regions in the deploy form or App Settings > Compute; these examples
do not pin regions. Other optional Compute settings:

```json
{ "compute": { "tier": "standard", "port": 8080, "healthPath": "/healthz" } }
```

## Deploy with the CLI instead

```bash
ntro login
ntro apps create my-static
ntro deploy static --app my-static
```
