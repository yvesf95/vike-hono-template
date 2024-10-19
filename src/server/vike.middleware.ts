// import { Hono } from 'hono';
// import { renderPage } from 'vike/server';

// const app = new Hono();

// app.get('*', async (c, next) => {
//   const pageContextInit = {
//     urlOriginal: c.req.url,
//     // Add any additional information about the request here ...
//   };
//   const pageContext = await renderPage(pageContextInit);
//   const { httpResponse } = pageContext;
//   if (!httpResponse) {
//     return next();
//   } else {
//     // `body` is the HTML of the page with a route matching pageContextInit.urlOriginal
//     const { body, statusCode, headers } = httpResponse;
//     headers.forEach(([name, value]) => c.header(name, value));
//     c.status(statusCode);

//     return c.body(body);
//   }
// });

// export default app;
