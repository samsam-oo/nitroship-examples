import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Nitroship VitePress',
  description: 'Managed static pages on the CDN',
  srcExclude: ['README.md'],
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }, { text: 'About', link: '/about' }],
  },
});
