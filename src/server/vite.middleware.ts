import { HttpBindings } from '@hono/node-server';
import { createMiddleware } from 'hono/factory';
import { createServer } from 'vite';

export const viteDevMiddleware = createMiddleware<{ Bindings: HttpBindings }>(async (c, next) => {
  const viteDevServer = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  const viteDevMiddleware = () => {
    return new Promise<void>((resolve) => {
      viteDevServer.middlewares(c.env.incoming, c.env.outgoing, () => resolve());
    });
  };
  await viteDevMiddleware();
  await next();
});
