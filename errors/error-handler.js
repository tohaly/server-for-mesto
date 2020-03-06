const translateErrors = require('./translate-errors');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    return translateErrors(err, res);
  }

  return res.status(err.statusCode).send({ message: err.message });
};
