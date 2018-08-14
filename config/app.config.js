

require('dotenv').load();


/**
 * Set your credentials to authenticate the open source ​ Apache Fineract API
 *
 * @type {{username: string, password: string}}
 */
module.exports.apacheFineractApi = {
  apiHost: process.env.APACHE_FINERACT_API_HOST || 'https://demo.openmf.org/fineract-provider/api/v1',
  auth: {
    username: process.env.APACHE_FINERACT_API_USERNAME || 'mifos',
    password: process.env.APACHE_FINERACT_API_PASSWORD || 'password',
  }
};


module.exports.router = {
  port: process.env.APP_PORT || 8001,
  apiPath: process.env.APP_API || 'api/v1',
};
