const fsPromises = require('fs').promises;

// eslint-disable-next-line consistent-return
function findUser(data, res, req) {
  const JSONData = JSON.parse(data);
  for (let i = 0; i < JSONData.length; i += 1) {
    if (JSONData[i]._id === req.params.id) {
      return res.send(JSONData[i]);
    }
    return res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
}

const readUsers = fsPromises.readFile('./data/users.json', { encoding: 'utf8' });

function getUsersList(res) {
  readUsers
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(`Проблема с получением данных о пользователях, ошибка: ${err}`);
    });
}

function getUserById(req, res) {
  readUsers
    .then(data => {
      findUser(data, res, req);
    })
    .catch(err => {
      console.log(`Проблема с получением данных о пользователе, ошибка: ${err}`);
    });
}

module.exports = {
  getUsersList,
  getUserById
};
