const Card = require('../models/card');
const { indentifyError } = require('../libs/helpers');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => indentifyError(res, err));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(err => indentifyError(res, err));
};
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ message: `Карточка успешно удалена!` }))
    .catch(err => indentifyError(res, err));
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('user')
    .then(card => res.send({ data: card }))
    .catch(err => indentifyError(res, err));
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('user')
    .then(card => res.send({ data: card }))
    .catch(err => indentifyError(res, err));
};
