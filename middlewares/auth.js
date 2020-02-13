const jwt = require('jsonwebtoken');
const resMessage = require('../libs/resMessage');
const { sendOnlyMessage } = require('../libs/helpers');

module.exports = (req, res, next) => {
  const { authorization } = req.body;

  if (!authorization || authorization.startsWith('Bearer ')) {
    return sendOnlyMessage(res, resMessage.authorizationErr);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'SECRET-KEY');
  } catch (err) {
    return sendOnlyMessage(res, resMessage.authorizationErr);
  }

  req.user = payload;

  next();
};
