const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { validOptions } = require('../libs/validOptions');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: validOptions.requiredField,
      minlength: validOptions.minChar,
      maxlength: validOptions.maxChar
    },
    about: {
      type: String,
      required: validOptions.requiredField,
      minlength: validOptions.minChar,
      maxlength: validOptions.maxChar
    },
    avatar: {
      type: String,
      required: validOptions.requiredField,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${validOptions.urlMessage}`
      }
    },
    email: {
      type: String,
      required: validOptions.requiredField,
      unique: true,
      validate: {
        validator(valid) {
          return validator.isEmail(valid);
        },
        message: props => `${props.value} ${validOptions.emailMessage}`
      }
    },
    password: {
      type: String,
      required: validOptions.requiredField,
      minlength: validOptions.minPasswordLength,
      select: false
    }
  },
  {
    versionKey: false
  }
);

// eslint-disable-next-line func-names
UserSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', UserSchema);
