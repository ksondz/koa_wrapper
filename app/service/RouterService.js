

const Router = require('koa-router');

const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const routerConfig = require('../../config/router.config');
const controller = require('../controller/ApacheFineractAPIController');


class RouterService {


  constructor() {
    this.router = new Router();
    this.config = routerConfig;

    this.bodyParserOptions = { strict: true };
    this.corsOptions = {
      methods: ['GET', 'POST'],
    };
  }


  /**
   * @return {Promise<void>}
   */
  async initRoutes() {

    this.router.prefix('/');

    Object.keys(this.config.routes).forEach((routeName) => {
      const routeConfig = this.config.routes[routeName];

      if (routeConfig.allowedMethods.includes('GET')) {
        this.router.get(routeName, routeConfig.path, controller.fetchAll);

        if (routeConfig.routeIdentifierName) {
          this.router.get(routeName, `${routeConfig.path}/:${routeConfig.routeIdentifierName}`, controller.fetch);
        }
      }

      if (routeConfig.allowedMethods.includes('POST')) {
        this.router.post(routeName, routeConfig.path, controller.create);
      }
    });
  }

  /**
   * @param routeName
   * @param queryParams
   */
  filteredRouterQueryParams(routeName, queryParams) {
    const { queryWhitelist } = this.config.routes[routeName];
    const filteredParams = {};

    if (queryWhitelist && Object.keys(queryParams).length) {
      queryWhitelist.forEach((parameter) => {
        switch (true) {
          case ((typeof parameter === 'string') && Object.keys(queryParams).includes(parameter)):
            filteredParams[parameter] = queryParams[parameter];
            break;
          case ((typeof parameter === 'object') && parameter.values.includes(queryParams[parameter.name])):
            filteredParams[parameter.name] = queryParams[parameter.name];
            break;
          default:
        }
      });
    }

    return filteredParams;
  }

  /**
   * @return {*|Router}
   */
  getRouter() {
    return this.router;
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
}

module.exports = new RouterService();

