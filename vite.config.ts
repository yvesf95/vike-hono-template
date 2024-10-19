// Vike
import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';

// Vite
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '.');

export default defineConfig({
  plugins: [
    vike({}),
    // devServer({
    //   entry: 'src/server/index.ts',
    //   exclude: [
    //     /^\/@.+$/,
    //     /.*\.(ts|tsx|vue)($|\?)/,
    //     /.*\.(s?css|less)($|\?)/,
    //     /^\/favicon\.ico$/,
    //     /.*\.(svg|png)($|\?)/,
    //     /^\/(public|assets|static)\/.+/,
    //     /^\/node_modules\/.*/,
    //   ],
    //   injectClientScript: false,
    // }),
    react({}),
  ],
  server: {
    port: 3002,
    hmr: {
      port: 3002,
    },
    watch: {
      // So it doesn't send `type: full-reload` message on HMR socket when server files change.
      ignored: ['**/src/server/**'],
    },
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve(root, 'src'),
    },
  },
});
