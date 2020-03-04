const responseMessages = require('../libs/response-messages');
const RequestWrong = require('../errors/request-wrong');

module.exports = (err, res) => {
  let customError;
  switch (err.name) {
    case 'ValidationError':
      customError = new RequestWrong(`${responseMessages.validationErr} / ${err}`);
      break;
    case 'CastError':
      customError = new RequestWrong(responseMessages.badId);
      break;
    case err.message.startsWith('E11000') ? err.name : true:
      customError = new RequestWrong(responseMessages.emailMatches);
      break;
    default:
      res.status(500).send({ message: `${responseMessages.internalServerError} ${err}` });
      break;
  }
  return res.status(customError.statusCode).send({ message: customError.message });
};
