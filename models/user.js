const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator(valid) {
          return /^https?:\/\/(www\.)?(([a-z\d][a-z\d-]+(\.[a-z]{2,}){1,127})|((\d{1,3}\.){3}\d{1,3}))(:\d{2,5})?((\/[a-z\d-]{2,}){1,})?\/?#?$/.test(
            valid
          );
        },
        message: props => `Ошибка. ${props.value} является не правильным форматом для url`
      }
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('user', UserSchema);
