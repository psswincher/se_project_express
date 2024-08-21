const router = require("express").Router();
const { signin } = require("../controllers/signin");

router.post("/", signin);

module.exports = router;
