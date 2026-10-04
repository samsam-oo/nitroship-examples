import { fileURLToPath } from 'node:url'
import fastifyStatic from '@fastify/static'

const publicDirectory = fileURLToPath(new URL('./public/', import.meta.url))

export default async function app (fastify) {
  await fastify.register(fastifyStatic, {
    root: publicDirectory
  })

  fastify.get('/', async function (_request, reply) {
    const time = new Date().toISOString()
    return reply.type('text/html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Fastify on Nitroship</title>
</head>
<body>
  <main>
    <h1>Fastify on Nitroship</h1>
    <p>Server time: <time datetime="${time}">${time}</time></p>
    <p>This HTML is generated for each request on Compute.</p>
    <ul>
      <li><a href="/api/hello">JSON API</a></li>
      <li><a href="/marker.txt">Static asset served by Fastify</a></li>
    </ul>
  </main>
</body>
</html>`)
  })

  fastify.get('/api/hello', async function () {
    return {
      framework: 'fastify',
      message: 'Hello from Fastify on Nitroship!',
      time: new Date().toISOString()
    }
  })
}
