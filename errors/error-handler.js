const translateErrors = require('./translate-errors');

module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    return translateErrors(err, res);
  }

  res.status(err.statusCode).send({ message: err.message });
};
