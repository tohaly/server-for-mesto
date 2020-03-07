module.exports = {
  success: {
    removeCard: 'Пост успешно удален!'
  },
  clientErrors: {
    validation: `Ошибка валидации`,
    badId: 'Не правильный формат id',
    mailMismatch: 'Такой Email уже существует',
    authentication: 'Неправильные почта или пароль',
    authorization: 'Неправильные почта или пароль',
    forbidden: 'Недостаточно прав для совершения данного действия',
    userNotFound: 'Нет пользователя с таким id',
    cardNotFound: 'Пост с таким id не найден',
    resourceNotFound: 'Запрашиваемый ресурс не найден'
  },
  serverErrors: {
    internalServerError: 'Произошла ошибка сервера:'
  }
};
