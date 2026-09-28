import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Next.js on Nitroship</h1>
      <p>ISR, SSR, tagged revalidation, scheduled cron, proxy, and optimized images.</p>
      <nav aria-label="Examples">
        <ul>
          <li><Link href="/isr">ISR and tagged cache (30 seconds)</Link></li>
          <li><Link href="/ssr">SSR request headers</Link></li>
          <li><Link href="/cron">Last cron run</Link></li>
          <li><Link href="/old">Proxy redirect to home</Link></li>
          <li><Link href="/r/ssr">Proxy rewrite to SSR</Link></li>
        </ul>
      </nav>
      <Image src="/nitroship-mark.png" alt="Nitroship mark" width={128} height={128} />
    </main>
  );
}
