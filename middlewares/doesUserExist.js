const User = require('../models/user');
const { resMessage } = require('../libs/resMessage');
const { sendOnlyMessage, indentifyError } = require('../libs/helpers');

module.exports.doesUserExist = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        sendOnlyMessage(res, resMessage.userNotFound);
        return;
      }

      next();
    })
    .catch(err => {
      indentifyError(res, err);
    });
};
