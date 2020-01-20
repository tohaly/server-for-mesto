const express = require('express');
const path = require('path');

const cards = require('./routers/cards');
const users = require('./routers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use('/cards', cards);
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен 👌, порт: ${PORT}.`);
});
