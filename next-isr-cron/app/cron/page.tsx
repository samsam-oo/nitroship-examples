import { getLastCronRun } from '../../lib/cron';

export const dynamic = 'force-dynamic';

export default function CronPage() {
  const lastRun = getLastCronRun();
  return (
    <main>
      <h1>Scheduled cron</h1>
      <p>Last run on this instance: <time data-testid="last-cron-run">{lastRun ?? 'Never'}</time></p>
      <p>Memory is per instance and resets on restart; a request may reach another instance. Scheduled jobs run only on production deployments.</p>
      <a href="/">Home</a>
    </main>
  );
}
