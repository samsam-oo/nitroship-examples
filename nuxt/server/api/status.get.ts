export default defineEventHandler((event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  return {
    framework: 'nuxt',
    runtime: 'node-server',
    serverTime: new Date().toISOString()
  }
})
