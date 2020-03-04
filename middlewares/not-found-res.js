const responseMessages = require('../libs/response-messages');
const NotFoundError = require('../errors/not-found-error');

module.exports.notFoundRes = () => {
  throw new NotFoundError(responseMessages.notFoundRes);
};
