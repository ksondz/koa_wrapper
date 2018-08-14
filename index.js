
const Koa = require('koa');

const routerService = require('./app/service/RouterService');
const errorService = require('./app/service/ErrorService');

(async () => {
  const app = new Koa();

  app.context.routerService = routerService;

  await routerService.initRoutes();

  app.use(errorService.handleError);
  app.use(routerService.getCors());
  app.use(routerService.getBodyParser());

  app.use(routerService.getRouter().routes());
  app.use(routerService.getRouter().allowedMethods());

  await app.listen(routerService.getPort());
  console.log(`API is up on port ${routerService.getPort()}`);
})();
