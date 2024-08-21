const router = require("express").Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

router.get("/me", getCurrentUser);
router.get("/:_id", getUserById);
router.get("/", getUsers);
router.patch("/me", updateUser);

module.exports = router;
