

const port = process.env.APP_PORT || 8001;
const apiPath = process.env.APP_API || 'api/v1';

/**
 * @type {{
 *  port: (*|number),
 *  apiPath: (*|string),
 *  routes: {
 *    client: {
 *      path: string,
 *      routeIdentifierName: string,
 *      allowedMethods: string[],
 *      queryWhitelist: string[]
 *    },
 *    loanProducts: {
 *      path: string,
 *      routeIdentifierName: string,
 *      allowedMethods: string[],
 *      queryWhitelist: string[]
 *    },
 *    loan: {
 *      path: string,
 *      routeIdentifierName: string,
 *      allowedMethods: string[],
 *      queryWhitelist: *[]
 *    }
 *  }
 * }}
 */
module.exports = {
  port,
  apiPath,
  routes: {
    client: {
      path: `/${apiPath}/clients`,
      routeIdentifierName: 'clientId',
      allowedMethods: ['GET', 'POST'],
      queryWhitelist: [
        'template',
        'fields',
        'offset',
        'limit',
        'orderBy',
        'sortBy',
        'sortOrder',
        'officeId',
        'underHierarchy',
        'displayName',
        'firstName',
        'lastName',
        'externalId',
        'sqlSearch',
        'orphansOnly',
      ],
    },
    loanProducts: {
      path: `/${apiPath}/loanproducts`,
      routeIdentifierName: 'productId',
      allowedMethods: ['GET', 'POST'],
      queryWhitelist: ['template', 'fields'],
    },
    loan: {
      path: `/${apiPath}/loans`,
      routeIdentifierName: 'loanId',
      allowedMethods: ['GET', 'POST'],
      queryWhitelist: [
        {
          name: 'command',
          values: [
            'approve',
            'reject',
            'withdrawnByApplicant',
          ],
        },
        'fields',
        'offset',
        'limit',
        'orderBy',
        'sortOrder',
        'sortBy',
        'officeId',
        'underHierarchy',
        'accountNo',
        'externalId',
        'sqlSearch',
        'associations',
        'exclude',
      ],
    },
  },
};
