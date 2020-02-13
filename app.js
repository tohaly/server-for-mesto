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

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
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
  console.log(`Сервер запущен 👌, порт: ${PORT}.`);
});
