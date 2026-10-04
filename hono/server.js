import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()
app.get('/', c => {
  const time = new Date().toISOString()
  return c.html(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Hono on Nitroship</title></head><body><h1>Hono on Nitroship</h1><p>Rendered at <time>${time}</time> on Compute.</p><p><a href="/api/hello">JSON endpoint</a> · <a href="/marker.txt">Static asset</a></p></body></html>`)
})
app.get('/api/hello', c => c.json({ framework: 'hono', message: 'Hello from Hono', time: new Date().toISOString() }))
app.get('/marker.txt', serveStatic({ root: './public' }))
serve({ fetch: app.fetch, port: Number(process.env.PORT || 3000), hostname: '0.0.0.0' })
