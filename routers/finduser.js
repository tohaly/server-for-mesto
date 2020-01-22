// eslint-disable-next-line consistent-return
function findUser(data, res, req) {
  for (let i = 0; i < data.length; i += 1) {
    if (data[i]._id === req.params.id) {
      return res.send(data[i]);
    }
    return res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
}

module.exports = findUser;
