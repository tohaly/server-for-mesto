const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getResponse } = require('../libs/helpers');
const updateOptions = require('../libs/optionsForModeUpdatel');

const { JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(user => getResponse(res, user))
    .catch(next);
};
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => getResponse(res, user))
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.create({ name, about, avatar, email, password })
    .then(user => {
      User.updatePassword(user, res);
    })
    .catch(next);
};
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, updateOptions)
    .then(user => getResponse(res, user))
    .catch(next);
};
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, updateOptions)
    .then(user => getResponse(res, user))
    .catch(next);
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
