const User = require('../models/user');
const responseMessages = require('../libs/response-messages');

const NotFoundError = require('../errors/not-found-error');

module.exports.doesUserExist = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        throw new NotFoundError(responseMessages.userNotFound);
      }

      next();
    })
    .catch(next);
};
