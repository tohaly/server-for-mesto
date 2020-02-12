const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { getResponse, indentifyError } = require('../libs/helpers');

const updateOptions = {
  new: true,
  runValidators: true,
  upsert: true
};

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
  const { name, about, avatar, email } = req.body;

  bcrypt
    .hash(req.body.password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user => getResponse(res, user))
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
