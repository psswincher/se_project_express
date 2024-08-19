const { API_ERROR } = require("./errors");

module.exports.handleError = (err, res) => {
  console.error(err);
  return res.status(err.statusCode).send(err); //{ message: err.message }
};

module.exports.handleDefaultError = (message, res) => {
  const error = new API_ERROR(message);
  this.handleError(error, res);
};
