import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Live domain: used for canonical URLs, social cards and the sitemap.
  site: 'https://vektide.com',
  // /demo/sent is a noindex thank-you page, so keep it out of the sitemap too.
  integrations: [sitemap({ filter: (page) => !page.includes('/demo/sent') })],
  vite: { plugins: [tailwindcss()] },
});
