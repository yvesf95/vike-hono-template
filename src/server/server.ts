import { HttpBindings, serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { createServer } from 'http';
import { renderPage } from 'vike/server';
import { config } from './config';

const isProduction = process.env.NODE_ENV === 'production';
const port = config.app.port;

const app = new Hono<{ Bindings: HttpBindings }>();

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (!isProduction) {
  console.log('Server running in development mode...');
  // app.use(viteDevMiddleware);
  app.use(async (c, next) => {
    // We instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We instantiate it only in development. (It isn't needed in production and it
    // would unnecessarily bloat our production server.)
    const vite = await import('vite');
    const viteDevServer = await vite.createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base: '/',
    });
    const viteDevMiddleware = () => {
      return new Promise<void>((resolve) => {
        viteDevServer.middlewares(c.env.incoming, c.env.outgoing, () => resolve());
      });
    };
    await viteDevMiddleware();
    await next();
  });
} else {
  console.log('Server running in production mode...');
  app.use('*', serveStatic({ root: './dist/client/assets' }));
}

// ...
// Put other middlewares here. (e.g. some RPC middleware such as Telefunc)
// ...

// Vike middleware. It should always be our last middleware (because it's a
// catch-all middleware superseding any middleware placed after it).
// app.route('/', vikeMiddleware);
app.get('*', async (c, next) => {
  const pageContextInit = {
    urlOriginal: c.req.url,
    // Add any additional information about the request here ...
  };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  // if (!httpResponse) {
  //   return next();
  // } else {
  // `body` is the HTML of the page with a route matching pageContextInit.urlOriginal
  const { body, statusCode, headers } = httpResponse;
  headers.forEach(([name, value]) => c.header(name, value));
  c.status(statusCode);

  return c.body(body);
  // }
});

serve({
  fetch: app.fetch,
  port: port,
  createServer: createServer,
});
console.log(`Server listening on http://localhost:${port}`);
