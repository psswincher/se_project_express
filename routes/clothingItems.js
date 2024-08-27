const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  validateCreateClothingItem,
  validateId,
} = require("../middlewares/validation");
const {
  getClothingItems,
  deleteClothingItem,
  createClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.delete("/:_id", auth, deleteClothingItem);
router.post("/", validateCreateClothingItem, auth, createClothingItem);
router.put("/:_id/likes", validateId, auth, likeItem);
router.delete("/:_id/likes", validateId, auth, dislikeItem);

module.exports = router;
