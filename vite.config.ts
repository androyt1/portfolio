import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('/framer-motion/') ||
            id.includes('/gsap/') ||
            id.includes('/lenis/')
          ) {
            return 'motion';
          }

          if (id.includes('/react/') || id.includes('/react-dom/')) {
            return 'react';
          }

          return undefined;
        },
      },
    },
  },
});
