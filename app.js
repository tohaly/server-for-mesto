const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cards = require('./routers/cards');
const users = require('./routers/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { notFoundRes } = require('./controllers/notFoundRes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(`\x1b[32m%s\x1b[0m`, `База данных успешно подключена`);
    console.log(`\x1b[33m%s\x1b[0m`, `------------`);
  })
  .catch(err => {
    console.log('\x1b[31m%s\x1b[0m', `Ошибка баззы данных: ${err}`);
    console.log(`\x1b[31m%s\x1b[0m`, `------------`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth);

app.use('/cards', cards);
app.use('/users', users);
app.use('/', notFoundRes);

app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `Сервер запущен 👌, порт: ${PORT}.`);
  console.log(`\x1b[33m%s\x1b[0m`, `------------`);
});
