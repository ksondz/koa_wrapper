

const apacheFineractAPIService = require('./../service/ApacheFineractAPIService');


class ApacheFineractController {


  constructor() {
    this.apacheFineractAPIService = apacheFineractAPIService;

    this.fetchAll = this.fetchAll.bind(this);
    this.fetch = this.fetch.bind(this);
    this.create = this.create.bind(this);
  }


  /**
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  async fetchAll(ctx, next) {
    const { routerService } = ctx.app.context;
    ctx.body = await this.apacheFineractAPIService.get(ctx._matchedRoute, routerService.filteredRouterQueryParams(ctx.routerName, ctx.request.query));
  }

  /**
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  async fetch(ctx, next) {
    const { routerService } = ctx.app.context;
    ctx.body = await this.apacheFineractAPIService.get(ctx._matchedRoute, routerService.filteredRouterQueryParams(ctx.routerName, ctx.request.query));
  }

  /**
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  async create(ctx, next) {
    ctx.body = await this.apacheFineractAPIService.post(ctx.originalUrl, ctx.request.body);
    ctx.status = 201;
  }
}

module.exports = new ApacheFineractController();

