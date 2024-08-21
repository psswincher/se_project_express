const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  getClothingItems,
  deleteClothingItem,
  createClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.delete("/:_id", auth, deleteClothingItem);
router.post("/", auth, createClothingItem);
router.put("/:_id/likes", auth, likeItem);
router.delete("/:_id/likes", auth, dislikeItem);

module.exports = router;
