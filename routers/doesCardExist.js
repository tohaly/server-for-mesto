const Card = require('../models/card');

module.exports.doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      next();
    })
    .catch(() => res.status(400).send({ message: 'Ошибка валидации id' }));
};
