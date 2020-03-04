const jwt = require('jsonwebtoken');
const responseMessages = require('../libs/response-messages');
const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(responseMessages.authorizationRequired);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'SECRET-KEY');
  } catch (err) {
    throw new AuthError(responseMessages.authorizationRequired);
  }

  req.user = payload;

  next();
};
