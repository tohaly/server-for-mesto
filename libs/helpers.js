const resMessages = require('./resMessages');

module.exports.getResponse = (res, data) => {
  return res.send({ data });
};

module.exports.sendCustomErrMessage = (res, err, data) => {
  return res.status(data.status).send({ message: `${data.message} ${err}` });
};

module.exports.sendOnlyMessage = (res, data) => {
  return res.status(data.status).send({ message: data.message });
};

module.exports.indentifyError = (res, err) => {
  switch (err) {
    case 'ValidationError':
      this.sendCustomErrMessage(res, err, resMessages.validErr);
      break;
    case 'CastError':
      this.sendOnlyMessage(res, resMessages.badId);
      break;
    case 'custonMismatchErr':
      this.sendOnlyMessage(res, resMessages.authenticationFailed);
      break;
    case 'E11000':
      this.sendOnlyMessage(res, resMessages.emailMatches);
      break;
    default:
      this.sendCustomErrMessage(res, err, resMessages.internalServerError);
      break;
  }
};

module.exports.like = (req, res, module) => {
  if (res.req.method === 'PUT') {
    return module.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
  }
  return module.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );
};
