

const requestPromise = require('request-promise');

const appConfig = require('../config/app.config');


class ApacheFineractAPIService {


  constructor() {
    this.config = appConfig.apacheFineractApi;

    this.requestHeaders = {
      'Content-type': 'application/json',
      'Fineract-Platform-TenantId': 'default',
      'Authorization': this.getBasicAuthorizationHeader(),
    };

    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
  }


  async get(route) {
    return requestPromise(this.getOptions(route))
      .catch(function (err) {
        throw err;
      });
  }

  async post(route, data) {
    return requestPromise(this.getOptions(route, 'POST', data))
      .catch(function (err) {
        return err;
      });
  }

  /**
   * @param route
   * @param method
   * @param data
   * @return {{
   *  method: string,
   *  url: string,
   *  headers: ({"Content-type": string, "Fineract-Platform-TenantId": string, Authorization: string}|*),
   *  json: boolean
   *}}
   */
  getOptions(route, method = 'GET', data) {
    const url = `${this.config.apiHost}${route}`;

    const options = {
      method: method,
      url: url,
      headers: this.requestHeaders,
      json: true,
    };

    if (data) {
      options.body = data;
    }

    return options;
  }

  /**
   * @return {string}
   */
  getBasicAuthorizationHeader() {
    const buffer = new Buffer(`${this.config.auth.username}:${this.config.auth.password}`);

    return `Basic ${buffer.toString('base64')}`;
  }
}

module.exports = new ApacheFineractAPIService();

