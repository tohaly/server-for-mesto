const fsPromises = require('fs').promises;

function getCards(res) {
  fsPromises
    .readFile('./data/cards.json', { encoding: 'utf8' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(`Что-то не так с получением данных карточек, ошибка ${err}`);
    });
}

module.exports = getCards;
