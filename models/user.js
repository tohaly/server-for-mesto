const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { validOption } = require('../libs/validOption');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: validOption.requiredField,
      minlength: validOption.minChar,
      maxlength: validOption.maxChar
    },
    about: {
      type: String,
      required: validOption.requiredField,
      minlength: validOption.minChar,
      maxlength: validOption.maxChar
    },
    avatar: {
      type: String,
      required: validOption.requiredField,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${validOption.urlMessage}`
      }
    },
    email: {
      type: String,
      required: validOption.requiredField,
      unique: true,
      validate: {
        validator(valid) {
          return validator.isEmail(valid);
        },
        message: props => `${props.value} ${validOption.emailMessage}`
      }
    },
    password: {
      type: String,
      required: validOption.requiredField,
      minlength: validOption.minPasswordLength
    }
  },
  {
    versionKey: false
  }
);

// eslint-disable-next-line func-names
UserSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email }).then(user => {
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
