/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { createLogger, transports } = require('winston');

const cards = require('./routers/cards');
const users = require('./routers/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { notFoundRes } = require('./middlewares/not-found-res');
const errorHandler = require('./errors/error-handler');
const { validateCreateUser, validateLogin } = require('./middlewares/request-validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(requestLogger);

// ********** Тест сервера *************

const TestReqLog = createLogger({
  transports: [new transports.File({ filename: 'logs/request.log' })]
});

const testErrLog = createLogger({
  transports: [new transports.File({ filename: 'logs/error.log' })]
});

app.get('/crash-test', (req, res, next) => {
  setTimeout(() => {
    throw new Error('Сервер упал!');
  }, 1000);
  TestReqLog.log(
    'info',
    `Краш тест сервера по адресу ${req.url}, метод: ${req.method}`,
    'my string'
  );
  testErrLog.log('info', `Тестируем перезапуск сервера... ... ... ...`, 'my string');
});

// ***********************

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use('/', auth);

app.use('/cards', cards);
app.use('/users', users);
app.use('/', notFoundRes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `Сервер запущен 👌, порт: ${PORT}.`);
  console.log(`\x1b[33m%s\x1b[0m`, `------------`);
});
