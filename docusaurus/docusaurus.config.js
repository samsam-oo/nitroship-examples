// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nitroship Docusaurus',
  tagline: 'Managed static pages on the CDN',
  // Set this to your deployed hostname for accurate canonical URLs.
  url: 'https://example.com',
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  presets: [['classic', { docs: false, blog: false }]],
  themeConfig: {
    navbar: {
      title: 'Nitroship Docusaurus',
      items: [{ to: '/', label: 'Home', position: 'left' }, { to: '/about/', label: 'About', position: 'left' }],
    },
  },
};
export default config;
