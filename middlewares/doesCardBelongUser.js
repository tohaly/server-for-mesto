const Card = require('../models/card');
const responseMessages = require('../libs/response-messages');
const RequestWrong = require('../errors/request-wrong');

module.exports.doesCardBelongUser = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (req.user._id !== String(card.owner._id)) {
        throw new RequestWrong(responseMessages.forbidden);
      }
      next();
    })
    .catch(next);
};
