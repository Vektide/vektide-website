import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Live domain: used for canonical URLs, social cards and the sitemap.
  site: 'https://vektide.com',
  // /demo/sent and /contact/sent are noindex thank-you pages, so keep them out of the sitemap too.
  integrations: [sitemap({ filter: (page) => !/\/sent\/?$/.test(page) })],
  vite: { plugins: [tailwindcss()] },
});
