

require('dotenv').load();


/**
 * Set your credentials to authenticate the open source Apache Fineract API
 *
 * @type {{username: string, password: string}}
 */
module.exports.apacheFineractApi = {
  host: process.env.APACHE_FINERACT_HOST || 'https://demo.openmf.org/fineract-provider',
  auth: {
    username: process.env.APACHE_FINERACT_API_USERNAME || 'mifos',
    password: process.env.APACHE_FINERACT_API_PASSWORD || 'password',
  },
};
