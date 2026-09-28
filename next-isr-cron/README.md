# Next.js ISR and cron

Next.js 16 App Router example for ISR (30 seconds), tagged fetch invalidation, request-time SSR, a production-only cron, proxy redirects/rewrites, and automatic `next/image` optimization. No `images` block is needed: the Nitroship Next.js adapter configures the optimizer.

## Run locally

Use Node.js 22 or 24. Set secrets before starting, then run:

```sh
npm ci
npm run build
CRON_SECRET=local-cron-secret REVALIDATE_SECRET=local-revalidate-secret npm start
```

For development, use the same environment variables with `npm run dev` instead of `npm start`. The app listens on port 3000.

## Deploy

Set `CRON_SECRET` and `REVALIDATE_SECRET` on the Nitroship app (the deploy button generates both secrets). From the repository root:

```sh
ntro deploy next-isr-cron --app my-next-isr-cron --prod
```

The deploy button can deploy this subdirectory directly. Set `BASE=https://your-app.example.com`, `CRON_SECRET` and `REVALIDATE_SECRET` to the deployed values before trying these requests:

```sh
curl -i "$BASE/isr"                              # generated timestamp, 30-second ISR
curl -i "$BASE/ssr"                              # host and x-forwarded-* headers
curl -i "$BASE/old"                              # 307 redirect to /
curl -i "$BASE/r/ssr"                            # rewritten SSR page, x-example-proxy header
curl -i "$BASE/cron"                             # last run on the instance handling this request
curl -i "$BASE/api/cron"                         # 401 without a secret
curl -i -H "Authorization: Bearer $CRON_SECRET" "$BASE/api/cron"
curl -i -X POST "$BASE/api/revalidate?tag=time"  # 401 without a secret
curl -i -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" "$BASE/api/revalidate?tag=time"
curl -i "$BASE/_next/image?url=%2Fnitroship-mark.png&w=640&q=75"
```

The landing page (`/`) links to each example and uses a local optimized image. ISR serves a cached version until its 30-second window expires; a stale response can be served while a replacement is generated. A tag purge invalidates the tagged fetch and triggers regeneration; it may not change the rendered timestamp immediately. The cron uses `*/5 * * * *` in UTC and is scheduled **only for production deployments**. Nitroship sends `GET /api/cron` with `Authorization: Bearer <CRON_SECRET>` when the secret is configured. The displayed last run is in-memory **per instance** (not shared or durable), so another instance or a restart can show `Never` even after a successful run. Set secrets on the deployment: unauthenticated requests always return 401.
