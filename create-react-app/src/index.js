import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const nested = window.location.pathname === '/about/demo';
  return <main>
    <h1>Create React App on Nitroship</h1>
    <p>A client-only React app published to the CDN.</p>
    <nav><a href="/">Home</a> · <a href="/about/demo">Nested demo</a> · <a href="/marker.txt">Static asset</a></nav>
    <h2>{nested ? 'Nested demo: /about/demo' : 'Home'}</h2>
    <button onClick={() => setCount(count + 1)}>Count: {count}</button>
  </main>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
