const User = require("../models/user");
const { BAD_REQUEST, RESOURCE_NOT_FOUND } = require("../utils/errors");
const { handleError, handleDefaultError } = require("../utils/errorHandler");

const updateUserOptions = {
  new: true, //
  runValidators: true,
  // upsert: true // if the user entry wasn't found, it will be created
};

module.exports.updateUser = (req, res) => {
  console.log(req.body);
  const updates = {};
  const { name, avatar } = req.body;
  if (name) updates.name = name;
  if (avatar) updates.avatar = avatar;
  if (updates) {
    User.findByIdAndUpdate(req.user, updates, updateUserOptions)
      .orFail(() => {
        const error = new RESOURCE_NOT_FOUND(
          `No matching user for id '${req.user}'`
        );
        throw error;
      })
      .then((user) => {
        console.log(user);
        res.send({
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          const error = new BAD_REQUEST(err.message);
          handleError(error, res);
        } else if (err.name === "CastError") {
          const error = new BAD_REQUEST(
            `Can't find user by id '${req.user}', format is invalid.`
          );
          handleError(error, res);
        } else if (err instanceof RESOURCE_NOT_FOUND) {
          handleError(err, res);
        } else {
          handleDefaultError(err.message, res);
        }
      });
  }
  return null;
};

module.exports.getCurrentUser = (req, res) => {
  console.log(req.params);
  console.log(req.user);

  User.findById(req.user)
    .orFail(() => {
      const error = new RESOURCE_NOT_FOUND(
        `No matching user for id '${req.user}'`
      );
      throw error;
    })
    .then((user) =>
      res.send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new BAD_REQUEST(
          `Can't find user by id '${req.user}', format is invalid.`
        );
        handleError(error, res);
      } else if (err instanceof RESOURCE_NOT_FOUND) {
        handleError(err, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};
