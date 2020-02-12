const mongoose = require('mongoose');
const validator = require('validator');
const { validOption } = require('../libs/validOption');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: validOption.requiredField,
      minlength: validOption.minChar,
      maxlength: validOption.maxChar
    },
    link: {
      type: String,
      required: validOption.requiredField,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${validOption.urlMessage}`
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: validOption.requiredField
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
