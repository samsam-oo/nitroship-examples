<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>SvelteKit server rendering on Nitroship</title>
</svelte:head>

<main>
	<h1>SvelteKit server rendering on Nitroship</h1>
	<p>This timestamp is computed in a server-only load function for each page request.</p>
	<p>Server time: <time>{data.serverTime}</time></p>
	<p>Runtime: {data.runtime}</p>
	<nav>
		<a href="/api/status">JSON server route</a>
		<a href="/framework.svg">Public CDN asset</a>
	</nav>
	<img src="/framework.svg" alt="SvelteKit example badge" width="240" height="80" />
</main>

<style>
	:global(body) { margin: 0; background: #fff8f4; color: #452014; font-family: system-ui, sans-serif; }
	main { max-width: 48rem; margin: 4rem auto; padding: 1.5rem; }
	nav { display: flex; gap: 1.5rem; margin: 2rem 0; }
	a { color: #a32d0b; }
</style>
