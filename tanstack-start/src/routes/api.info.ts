import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/info')({
  server: {
    handlers: {
      GET: () => Response.json({
        framework: 'tanstack-start',
        serverTime: new Date().toISOString(),
      }),
    },
  },
})
