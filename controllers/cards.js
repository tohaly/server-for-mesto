const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.deleteCardById = (req, res) => {
  URLSearchParams.finbyIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
