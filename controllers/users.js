const User = require("../models/user");
const { BAD_REQUEST, RESOURCE_NOT_FOUND } = require("../utils/errors");
const { handleError, handleDefaultError } = require("../utils/errorHandler");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleDefaultError(err.message, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params._userId)
    .orFail(() => {
      const error = new RESOURCE_NOT_FOUND(
        `No matching user for id '${req.params._userId}'`
      );
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new BAD_REQUEST(
          `Can't find user by id '${req.params._userId}', format is invalid.`
        );
        handleError(error, res);
      } else if (err instanceof RESOURCE_NOT_FOUND) {
        handleError(err, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new BAD_REQUEST(err.message);
        handleError(error, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};
