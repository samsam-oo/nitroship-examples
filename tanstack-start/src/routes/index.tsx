import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getServerInfo = createServerFn({ method: 'GET' }).handler(() => ({
  framework: 'tanstack-start',
  serverTime: new Date().toISOString(),
}))

export const Route = createFileRoute('/')({
  loader: () => getServerInfo(),
  component: Home,
})

function Home() {
  const info = Route.useLoaderData()
  return (
    <main>
      <h1>TanStack Start on Nitroship</h1>
      <p>This page is rendered with a server function for each request.</p>
      <p>Server time: <time>{info.serverTime}</time></p>
      <p><a href="/api/info">JSON server route</a></p>
      <p><a href="/example.svg">Public asset served by the CDN</a></p>
      <img src="/example.svg" alt="Nitroship example" width="160" height="80" />
    </main>
  )
}
