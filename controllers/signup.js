const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { BAD_REQUEST, NON_UNIQUE_SUBMISSION } = require("../utils/errors");
const { handleError, handleDefaultError } = require("../utils/errorHandler");

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, avatar, email, password: hash })
        .then((user) =>
          res.status(201).send({
            _id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
          })
        )
        .catch((err) => {
          if (err.name === "ValidationError") {
            const error = new BAD_REQUEST(err.message);
            handleError(error, res);
          } else if (err.code === 11000) {
            const error = new NON_UNIQUE_SUBMISSION(err.message);
            handleError(error, res);
          } else {
            handleDefaultError(err.message, res);
          }
        })
    )
    .catch((err) => {
      handleDefaultError(err.message, res);
    });
};
