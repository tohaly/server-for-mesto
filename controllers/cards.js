const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ message: `Карточка успешно удалена!` }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
