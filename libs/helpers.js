const { resMessage } = require('./resMessage');

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
  if (err.name === 'ValidationError') {
    return this.sendCustomErrMessage(res, err, resMessage.validErr);
  }
  if (err.name === 'CastError') {
    return this.sendOnlyMessage(res, resMessage.badId);
  }
  return this.sendCustomErrMessage(res, err, resMessage.internalServError);
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
