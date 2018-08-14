

const requestPromise = require('request-promise');

const appConfig = require('../../config/app.config');


class ApacheFineractAPIService {


  constructor() {
    this.config = appConfig.apacheFineractApi;

    this.requestHeaders = {
      'Content-type': 'application/json',
      'Fineract-Platform-TenantId': 'default',
      Authorization: this.getBasicAuthorizationHeader(),
    };

    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
  }


  /**
   * @param route
   * @param queryParams
   * @return {Promise<void>}
   */
  async get(route, queryParams = {}) {
    const url = this.generateUrl(route);
    return requestPromise(this.getOptions(url, queryParams));
  }

  /**
   * @param route
   * @param queryParams
   * @param data
   * @return {Promise<void>}
   */
  async post(route, queryParams = {}, data) {
    const url = this.generateUrl(route);
    return requestPromise(this.getOptions(url, queryParams, 'POST', data));
  }

  /**
   * @param url
   * @param queryParams
   * @param method
   * @param data
   * @return {{
   *  method: string,
   *  url: *,
   *  headers: ({
   *    "Content-type": string,
   *    "Fineract-Platform-TenantId": string,
   *    Authorization: string
   *  }|*),
   *  body,
   *  qs: *,
   *  json: boolean
   *}}
   */
  getOptions(url, queryParams, method = 'GET', data = {}) {

    return {
      method,
      url,
      headers: this.requestHeaders,
      body: data,
      qs: queryParams,
      json: true,
    };
  }

  /**
   * @param route
   * @return {string}
   */
  generateUrl(route) {
    return `${this.config.host}${route}`;
  }

  /**
   * @return {string}
   */
  getBasicAuthorizationHeader() {
    const buffer = Buffer.from(`${this.config.auth.username}:${this.config.auth.password}`);

    return `Basic ${buffer.toString('base64')}`;
  }
}

module.exports = new ApacheFineractAPIService();

