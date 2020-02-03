const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cards = require('./routers/cards');
const users = require('./routers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  // Времнное решение
  req.user = {
    _id: '5e343e8aa70e5845b83c2c12'
  };

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use('/cards', cards);
app.use('/users', users);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен 👌, порт: ${PORT}.`);
});
