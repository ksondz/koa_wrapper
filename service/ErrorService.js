

class ErrorService {


  constructor() {
    this.defaultServerErrorMessage = 'Internal server error';

    /**
     * @response {any}
     */
    this.handleError = this.handleError.bind(this);
  }

  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async handleError(ctx, next) {

    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode;
      ctx.body = err.message || this.defaultServerErrorMessage;

      ctx.throw(ctx.status, ctx.body);
    }
  }
}

module.exports = new ErrorService();
