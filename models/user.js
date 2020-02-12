const mongoose = require('mongoose');
const validator = require('validator');
const { validOPtion } = require('../libs/validOption');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: validOPtion.requiredField,
      minlength: validOPtion.minChar,
      maxlength: validOPtion.maxChar
    },
    about: {
      type: String,
      required: validOPtion.requiredField,
      minlength: validOPtion.minChar,
      maxlength: validOPtion.maxChar
    },
    avatar: {
      type: String,
      required: validOPtion.requiredField,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${validOPtion.urlMessage}`
      }
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('user', UserSchema);
