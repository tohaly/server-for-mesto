const Card = require('../models/card');
const { resMessage } = require('../libs/resMessage');
const { sendOnlyMessage, indentifyError } = require('../libs/helpers');

module.exports.doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      console.log(card);
      if (!card) {
        sendOnlyMessage(res, resMessage.cardNotFound);
        return;
      }
      next();
    })
    .catch(err => {
      indentifyError(res, err);
    });
};
