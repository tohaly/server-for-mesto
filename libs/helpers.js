module.exports.getResponse = (res, data) => {
  return res.send({ data });
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
