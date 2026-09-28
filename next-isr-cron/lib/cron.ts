// Next.js bundles the route handler and page separately, so module-local variables
// are not shared even within one Node.js process.
const state = globalThis as typeof globalThis & { __nitroshipLastCronRun?: string };

export function recordCronRun(): string {
  const lastRun = new Date().toISOString();
  state.__nitroshipLastCronRun = lastRun;
  console.log(`[cron] ran at ${lastRun}`);
  return lastRun;
}

export function getLastCronRun(): string | null {
  return state.__nitroshipLastCronRun ?? null;
}
