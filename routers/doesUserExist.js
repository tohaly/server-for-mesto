const User = require('../models/user');

module.exports.doesUserExist = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      next();
    })
    .catch(() => res.status(400).send({ message: 'Ошибка валидации id' }));
};
