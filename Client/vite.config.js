

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects',
          dest: '.' // puts it into dist/
        }
      ]
    })
  ],
  base: process.env.VIT_BASE_PATH || '/',
  build: {
    outDir: 'dist',
  }
});
