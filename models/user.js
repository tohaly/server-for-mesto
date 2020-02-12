const mongoose = require('mongoose');
const validator = require('validator');
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

module.exports = mongoose.model('user', UserSchema);
