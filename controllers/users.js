const User = require("../models/user");
const {
  INVALID_USER_DATA,
  NO_MATCHING_USER_ID,
  ROUTE_CAST_ERROR,
} = require("../utils/errors");
const { handleError, handleDefaultError } = require("../utils/errorHandler");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleDefaultError(err.message, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params._userId)
    .orFail(() => {
      const error = new NO_MATCHING_USER_ID(
        `No matching user for id '${req.params._userId}'`
      );
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new ROUTE_CAST_ERROR(
          `Can't find user by id '${req.params._userId}', format is invalid.`
        );
        handleError(error, res);
      } else if (err instanceof NO_MATCHING_USER_ID) {
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
        const error = new INVALID_USER_DATA(err.message);
        handleError(error, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};
