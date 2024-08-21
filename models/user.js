const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { BAD_REQUEST, INVALID_LOGIN } = require("../utils/errors");

const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials({
  email,
  password,
}) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new INVALID_LOGIN("Incorrect password or email"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new INVALID_LOGIN("Incorrect password or email")
          );
        }
        return user;
      });
    });
};

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("user", userSchema);
