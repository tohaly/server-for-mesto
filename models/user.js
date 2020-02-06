const mongoose = require('mongoose');
const validator = require('validator');

const requiredField = [true, 'Обязательное поле для заполнения'];
const minChar = [2, 'Минимальное количество символов 2'];
const maxChar = [30, 'Максимальное количество символов 30'];

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: requiredField,
      minlength: minChar,
      maxlength: maxChar
    },
    about: {
      type: String,
      required: requiredField,
      minlength: minChar,
      maxlength: maxChar
    },
    avatar: {
      type: String,
      required: requiredField,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} — не правильным форматом для url-адресса`
      }
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('user', UserSchema);
