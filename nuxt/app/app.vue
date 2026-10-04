<script setup lang="ts">
const { data: status } = await useFetch('/api/status')
useHead({ title: 'Nuxt server rendering on Nitroship' })
</script>

<template>
  <main>
    <h1>Nuxt server rendering on Nitroship</h1>
    <p>This page gets its timestamp from the server API during SSR, before hydration.</p>
    <p>Server time: <time>{{ status?.serverTime }}</time></p>
    <p>Runtime: {{ status?.runtime }}</p>
    <nav>
      <a href="/api/status">JSON server route</a>
      <a href="/framework.svg">Public CDN asset</a>
    </nav>
    <img src="/framework.svg" alt="Nuxt example badge" width="240" height="80">
  </main>
</template>

<style>
body { margin: 0; background: #f4f8f6; color: #173c2d; font-family: system-ui, sans-serif; }
main { max-width: 48rem; margin: 4rem auto; padding: 1.5rem; }
nav { display: flex; gap: 1.5rem; margin: 2rem 0; }
a { color: #006b44; }
</style>
