const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { validOptions } = require('../libs/validOptions');
const { getResponse } = require('../libs/helpers');
const updateOptions = require('../libs/optionsForModeUpdatel');

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
  const customError = new Error('Matched error');
  customError.name = 'custonMismatchErr';

  return this.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(customError);
      }
      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) {
          return Promise.reject(customError);
        }
        return user;
      });
    });
};

// eslint-disable-next-line func-names
UserSchema.statics.updatePassword = function(user, res) {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return Promise.reject(err);
    }
    return this.findByIdAndUpdate(user._id, { password: hash }, updateOptions).then(updatingUser =>
      getResponse(res, updatingUser)
    );
  });
};

module.exports = mongoose.model('user', UserSchema);
