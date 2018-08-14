

class ErrorService {


  constructor() {
    this.defaultServerErrorMessage = 'Internal server error';

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

      if (!err.statusCode && !err.error) {
        console.error(err);
        ctx.throw(500, this.defaultServerErrorMessage);
      }

      ctx.status = err.statusCode;
      ctx.body = err.error;
    }
  }
}

module.exports = new ErrorService();
