const Card = require('../models/card');
const { resMessage } = require('../libs/resMessage');
const { sendOnlyMessage, indentifyError } = require('../libs/helpers');

module.exports.doesCardBelongUser = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (req.user._id === String(card.owner._id)) {
        sendOnlyMessage(res, resMessage.forbidden);
        return;
      }
      next();
    })
    .catch(err => {
      indentifyError(res, err);
    });
};
