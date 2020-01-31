const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.createUser = (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};
