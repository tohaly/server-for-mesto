const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: `Произошла ошибка сервера` }));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(400).send({ message: `Ошибка валидации: ${err}` }));
};
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ message: `Карточка успешно удалена!` }))
    .catch(() => res.status(500).send({ message: `Произошла ошибка сервера` }));
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('user')
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: `Произошла ошибка сервера` }));
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('user')
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: `Произошла ошибка сервера` }));
};
