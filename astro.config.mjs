// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://claritytech.github.io',
  base: '/tranquil-tails-landing',
  vite: {
    plugins: [tailwindcss()]
  }
});