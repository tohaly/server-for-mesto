const responseMessages = require('../libs/response-messages');
const RequestWrong = require('../errors/request-wrong');

module.exports = (err, res) => {
  let customError;
  switch (err.name) {
    case 'ValidationError':
      customError = new RequestWrong(`${responseMessages.clientErrors.validation} / ${err}`);
      break;
    case 'CastError':
      customError = new RequestWrong(responseMessages.clientErrors.badId);
      break;
    default:
      res
        .status(500)
        .send({ message: `${responseMessages.serverErrors.internalServerError} ${err}` });
      break;
  }
  return res.status(customError.statusCode).send({ message: customError.message });
};
