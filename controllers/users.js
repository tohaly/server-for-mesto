const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
