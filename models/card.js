const mongoose = require('mongoose');
const validator = require('validator');
const { validOPtion } = require('../libs/validOption');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: validOPtion.requiredField,
      minlength: validOPtion.minChar,
      maxlength: validOPtion.maxChar
    },
    link: {
      type: String,
      required: validOPtion.requiredField,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${validOPtion.urlMessage}`
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: validOPtion.requiredField
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
