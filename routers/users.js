const router = require('express').Router();
const fsPromises = require('fs').promises;
const findUser = require('./finduser.js');

const users = fsPromises.readFile('./data/users.json', { encoding: 'utf8' });

router.get('/', (req, res) => {
  users
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(`Проблема с получением данных о пользователях, ошибка: ${err}`);
    });
});

router.get('/:id', (req, res) => {
  users
    .then(data => {
      findUser(JSON.parse(data), res, req);
    })
    .catch(err => {
      console.log(`Проблема с получением данных о пользователе, ошибка: ${err}`);
    });
});

module.exports = router;
