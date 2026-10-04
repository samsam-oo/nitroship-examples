import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const nested = window.location.pathname === '/about/demo'
  return (
    <main>
      <h1>Vite on Nitroship</h1>
      <p>A React SPA served entirely from the CDN, without Compute.</p>
      <nav><a href="/">Home</a> · <a href="/about/demo">Nested demo</a> · <a href="/marker.txt">Static asset</a></nav>
      <h2>{nested ? 'Nested demo: /about/demo' : 'Home'}</h2>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <p>The nested URL can be opened directly thanks to the managed SPA fallback.</p>
    </main>
  )
}
