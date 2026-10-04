import Fastify from 'fastify'
import app from './app.js'

const server = Fastify({ logger: true })

try {
  await server.register(app)
  await server.listen({
    port: Number(process.env.PORT || 3000),
    host: '0.0.0.0'
  })
} catch (error) {
  server.log.error(error)
  process.exit(1)
}
