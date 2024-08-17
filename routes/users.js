const router = require("express").Router();
const { getUser, getUserById, createUser } = require("../controllers/users");
router.get("/users", getUser);
router.get("/users/:_id", getUserById);
router.post("/users", createUser);

module.exports = router;
