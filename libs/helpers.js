const { errMessages } = require('./errMessages');

module.exports.sendErrMessage = (res, err, data) => {
  return res.status(data.status).send({ message: `${data.message} ${err}` });
};

module.exports.indentifyError = (res, err) => {
  if (err.name === 'ValidationError') {
    return this.sendErrMessage(res, err, errMessages.validErr);
  }
  return this.sendErrMessage(res, err, errMessages.internalServError);
};
