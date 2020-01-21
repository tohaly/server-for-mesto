const router = require('express').Router();
const data = require('../data/users.json');

router.get('/', (req, res) => {
  res.send(data);
});

router.get('/:id/', (req, res) => {
  for (let i = 0; i < data.length; i += 1) {
    if (data[i]._id === req.params.id) {
      return res.send(data[i]);
    }
  }
  return res.send({ message: 'Нет пользователя с таким id' });
});

module.exports = router;
