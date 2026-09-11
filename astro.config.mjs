// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { createLastmodSerializer } from './src/utils/git-lastmod.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://tranquiltrailtravels.com',
  integrations: [sitemap({ serialize: createLastmodSerializer() })],
  vite: {
    plugins: [
      tailwindcss({
        config: './tailwind.config.mjs',
      }),
    ],
  },
});
