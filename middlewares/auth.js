const jwt = require('jsonwebtoken');
const responseMessages = require('../libs/response-messages');
const AuthError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(responseMessages.authorizationRequired);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'PASSWORD');
  } catch (err) {
    throw new AuthError(responseMessages.authorizationRequired);
  }

  req.user = payload;

  next();
};
