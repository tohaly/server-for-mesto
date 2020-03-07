const { celebrate, Joi } = require('celebrate');

const options = {
  text: Joi.string()
    .required()
    .min(2)
    .max(30),
  link: Joi.string()
    .required()
    .uri({ allowRelative: true }),
  password: Joi.string()
    .required()
    .min(8),
  email: Joi.string()
    .required()
    .min(3)
    .email()
};

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: options.text,
    about: options.text,
    avatar: options.link,
    email: options.email,
    password: options.password
  })
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: options.text,
    about: options.text
  })
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: options.link
  })
});

const validateCreateCardr = celebrate({
  body: Joi.object().keys({
    name: options.text,
    link: options.link
  })
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: options.email,
    password: options.password
  })
});

module.exports = {
  validateCreateUser,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCreateCardr,
  validateLogin
};
