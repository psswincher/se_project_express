const router = require("express").Router();
const { getUsers, getUserById, createUser } = require("../controllers/users");
router.get("/", getUsers);
router.get("/:_userId", getUserById);
router.post("/", createUser);

module.exports = router;
