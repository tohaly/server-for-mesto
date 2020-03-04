const Card = require('../models/card');
const { getResponse, like } = require('../libs/helpers');
const responseMessages = require('../libs/response-messages');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then(card => getResponse(res, card))
    .catch(next);
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => getResponse(res, card))
    .catch(next);
};
module.exports.deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(res.status(200).send({ message: responseMessages.successfulRemov }))
    .catch(next);
};
module.exports.likeToggle = (req, res, next) => {
  like(req, res, Card)
    .then(card => getResponse(res, card))
    .catch(next);
};
