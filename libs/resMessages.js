module.exports.resMessages = {
  successDel: {
    status: 200,
    message: 'Пост успешно удален!'
  },
  validErr: {
    status: 400,
    message: `Ошибка валидации:`
  },
  badId: {
    status: 400,
    message: 'Ошибка валидации id'
  },
  emailMatches: {
    status: 400,
    message: 'Такой Email уже существует'
  },
  authenticationFailed: {
    status: 401,
    message: 'Ошибка аутентификации'
  },
  authorizationRequired: {
    status: 401,
    message: 'Необходима авторизация'
  },
  forbidden: {
    status: 401,
    message: 'Нет прав для совершения данного действия'
  },
  userNotFound: {
    status: 404,
    message: 'Нет пользователя с таким id'
  },
  cardNotFound: {
    status: 404,
    message: 'Пост с таким id не найден'
  },
  notFoundRes: {
    status: 404,
    message: 'Запрашиваемый ресурс не найден'
  },
  internalServerError: {
    status: 500,
    message: `Произошла ошибка сервера:`
  }
};
