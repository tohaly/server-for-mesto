const User = require('../models/user');
const { getResponse, indentifyError } = require('../libs/helpers');

const UpdateOptions = {
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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => getResponse(res, user))
    .catch(err => indentifyError(res, err));
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, UpdateOptions)
    .then(user => getResponse(res, user))
    .catch(err => indentifyError(res, err));
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, UpdateOptions)
    .then(user => getResponse(res, user))
    .catch(err => indentifyError(res, err));
};
