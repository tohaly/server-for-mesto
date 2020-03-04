const Card = require('../models/card');
const responseMessages = require('../libs/response-messages');
const NotFoundError = require('../errors/not-found-error');

module.exports.doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (!card) {
        throw new NotFoundError(responseMessages.cardNotFound);
      }
      next();
    })
    .catch(next);
};
