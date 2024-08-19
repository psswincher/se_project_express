const router = require("express").Router();

const { ROUTE_NOT_FOUND } = require("../utils/errors");
const { handleError } = require("../utils/errorHandler");

router.use((req, res) => {
  const error = new ROUTE_NOT_FOUND(`Route not found: ${req.url}`);
  handleError(error, res);
});

module.exports = router;
