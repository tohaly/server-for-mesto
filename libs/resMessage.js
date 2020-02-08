module.exports.resMessage = {
  validErr: {
    status: 400,
    message: `Ошибка валидации:`
  },
  internalServError: {
    status: 500,
    message: `Произошла ошибка сервера:`
  },
  userNotFound: {
    status: 404,
    message: 'Нет пользователя с таким id'
  },
  badId: {
    status: 400,
    message: 'Ошибка валидации id'
  },
  cardNotFound: {
    status: 404,
    message: 'Пост с таким id не найден'
  },
  successDel: {
    status: 200,
    message: 'Пост успешно удален!'
  },
  notFoundRes: {
    status: 404,
    message: 'Запрашиваемый ресурс не найден'
  }
};
