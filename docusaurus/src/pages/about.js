import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Page() {
  return <Layout title="Nitroship docusaurus about" description="Build-time HTML on the Nitroship CDN.">
    <main className="container margin-vert--lg">
      <h1>Nitroship docusaurus about</h1>
      <p>Build-time HTML served from the Nitroship CDN.</p>
      <nav><Link to="/">Home</Link>{' · '}<Link to="/about/">About</Link></nav>
      <img src="/ship.svg" alt="Nitroship sailboat" width="160" height="100" />
    </main>
  </Layout>;
}
