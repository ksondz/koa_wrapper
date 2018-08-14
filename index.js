
const Koa = require('koa');

const routerService = require('./service/RouterService');

(async () => {
  const app = new Koa();

  await routerService.initRoutes();

  app.use(routerService.getCors());
  app.use(routerService.getBodyParser());

  app.use(routerService.getRouter().routes());
  app.use(routerService.getRouter().allowedMethods());

  await app.listen(routerService.getPort());
  console.log(`API is up on port ${routerService.getPort()}`);
})();
