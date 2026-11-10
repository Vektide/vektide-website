import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Live domain: used for canonical URLs, social cards and the sitemap.
  site: 'https://vektide.com',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
