const Card = require('../models/card');
const resMessages = require('../libs/resMessages');
const { sendOnlyMessage, indentifyError } = require('../libs/helpers');

module.exports.doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (!card) {
        sendOnlyMessage(res, resMessages.cardNotFound);
        return;
      }
      next();
    })
    .catch(err => {
      indentifyError(res, err);
    });
};
