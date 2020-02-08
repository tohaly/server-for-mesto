const Card = require('../models/card');
const { getResponse, sendOnlyMessage, indentifyError, like } = require('../libs/helpers');
const { resMessage } = require('../libs/resMessage');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => getResponse(res, card))
    .catch(err => indentifyError(res, err));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => getResponse(res, card))
    .catch(err => indentifyError(res, err));
};
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send(sendOnlyMessage(res, resMessage.successDel)))
    .catch(err => indentifyError(res, err));
};
module.exports.likeToggle = (req, res) => {
  like(req, res, Card)
    .then(card => getResponse(res, card))
    .catch(err => indentifyError(res, err));
};
