const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getResponse, indentifyError } = require('../libs/helpers');
const updateOptions = require('../libs/optionsForModeUpdatel');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => getResponse(res, user))
    .catch(err => indentifyError(res, err));
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => getResponse(res, user))
    .catch(err => indentifyError(res, err));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  User.updatePassword(name, res);
  User.create({ name, about, avatar, email, password })
    .then(user => {
      return User.updatePassword(user, res);
    })
    .catch(err => indentifyError(res, err));
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, updateOptions)
    .then(user => getResponse(res, user))
    .catch(err => indentifyError(res, err));
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, updateOptions)
    .then(user => getResponse(res, user))
    .catch(err => indentifyError(res, err));
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, 'SECRET-KEY', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(err => indentifyError(res, err));
};
