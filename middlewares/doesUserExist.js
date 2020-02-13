const User = require('../models/user');
const { resMessages } = require('../libs/resMessages');
const { sendOnlyMessage, indentifyError } = require('../libs/helpers');

module.exports.doesUserExist = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        sendOnlyMessage(res, resMessages.userNotFound);
        return;
      }

      next();
    })
    .catch(err => {
      indentifyError(res, err);
    });
};
