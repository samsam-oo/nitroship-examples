import * as React from "react";
import { Link } from "gatsby";

export default function Page() {
  return <main>
    <h1>Nitroship gatsby home</h1>
    <p>Build-time HTML served from the Nitroship CDN.</p>
    <nav><Link to="/">Home</Link>{" · "}<Link to="/about/">About</Link></nav>
    <img src="/ship.svg" alt="Nitroship sailboat" width="160" height="100" />
  </main>;
}

export const Head = () => <title>Nitroship gatsby home</title>;
