const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const { INVALID_LOGIN, BAD_REQUEST } = require("../utils/errors");
const { handleError, handleDefaultError } = require("../utils/errorHandler");

module.exports.signin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return handleError(new BAD_REQUEST("Incorrect password or email"), res);
  }
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({
        token,
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof INVALID_LOGIN) {
        handleError(err, res);
      } else {
        handleDefaultError(err, res);
      }
    });
};
