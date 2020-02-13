const jwt = require('jsonwebtoken');
const resMessages = require('../libs/resMessages');
const { sendOnlyMessage } = require('../libs/helpers');

module.exports = (req, res, next) => {
  const { authorization } = req.body;

  if (!authorization || authorization.startsWith('Bearer ')) {
    return sendOnlyMessage(res, resMessages.authorizationRequired);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'SECRET-KEY');
  } catch (err) {
    return sendOnlyMessage(res, resMessages.authorizationRequired);
  }

  req.user = payload;

  next();
};
