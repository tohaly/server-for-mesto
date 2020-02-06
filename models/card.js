const mongoose = require('mongoose');
const validator = require('validator');

const requiredField = [true, 'Обязательное поле для заполнения'];
const minChar = [2, 'Минимальное количество символов 2'];
const maxChar = [30, 'Максимальное количество символов 30'];

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: requiredField,
      minlength: minChar,
      maxlength: maxChar
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} — не правильным форматом для url-адресса`
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: requiredField
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('card', cardSchema);
