

const Router = require('koa-router');

const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const appConfig = require('../config/app.config');
const apacheFineractAPIService = require('./ApacheFineractAPIService');


class RouterService {

  constructor() {
    this.router = new Router();
    this.config = appConfig.router;

    this.bodyParserOptions = { strict: true };
    this.corsOptions = {
      methods: ['GET', 'POST'],
    };
  }

  async getRoutes() {

    await this.initRoutes();

    return this.router.routes();
  }

  getRouter() {
    return this.router;
  }


  async initRoutes() {

    this.router.prefix('/');

    this.router.post(`/${this.config.apiPath}/clients`, async (ctx, next) => {
      const response = await apacheFineractAPIService.post('/clients', ctx.request.body);
      ctx.body = response.body || response.error;
      ctx.status = response.statusCode;
    });

    this.router.get(`/${this.config.apiPath}/clients`, async (ctx, next) => {
      const response = await apacheFineractAPIService.get('/clients');
      ctx.body = response.body || response.error;
      ctx.status = response.statusCode;
    });

    this.router.get(`/${this.config.apiPath}/clients/:clientId`, async (ctx, next) => {
      const { clientId } = ctx.params;
      const response = await apacheFineractAPIService.get(`/clients/${clientId}`);
      ctx.body = response.body || response.error;
      ctx.status = response.statusCode;
    });
  }

  /**
   * @return {*}
   */
  getPort() {
    return this.config.port;
  }

  /**
   * @return {*}
   */
  getBodyParser() {
    return bodyParser(this.bodyParserOptions);
  }

  /**
   * @return {*}
   */
  getCors() {
    return cors(this.corsOptions);
  }

  // async __getMethod(ctx, next) {
  //
  // }
}

module.exports = new RouterService();

