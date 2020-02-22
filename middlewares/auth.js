const jwt = require('jsonwebtoken');
const resMessages = require('../libs/resMessages');
const { sendOnlyMessage } = require('../libs/helpers');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    sendOnlyMessage(res, resMessages.authorizationRequired);
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'SECRET-KEY');
  } catch (err) {
    sendOnlyMessage(res, resMessages.authorizationRequired);
    return;
  }

  req.user = payload;

  next();
};
