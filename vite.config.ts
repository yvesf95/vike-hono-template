import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

console.log('vite.config.ts', process.env.APP_PORT);

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
    hmr: { port: 3002 },
    watch: { ignored: ['**/src/server/**'] },
  },
});
