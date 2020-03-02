const mongoose = require('mongoose');
const validator = require('validator');
const { validOptions } = require('../libs/validOptions');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: validOptions.requiredField,
      minlength: validOptions.minChar,
      maxlength: validOptions.maxChar
    },
    link: {
      type: String,
      required: validOptions.requiredField,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${validOptions.urlMessage}`
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: validOptions.requiredField
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
