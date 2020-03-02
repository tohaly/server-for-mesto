const Card = require('../models/card');
const resMessages = require('../libs/resMessages');
const { sendOnlyMessage, indentifyError } = require('../libs/helpers');

module.exports.doesCardBelongUser = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (req.user._id !== String(card.owner._id)) {
        sendOnlyMessage(res, resMessages.forbidden);
        return;
      }
      next();
    })
    .catch(err => {
      indentifyError(res, err);
    });
};
