const router = require("express").Router();
const {
  getClothingItems,
  deleteClothingItem,
  createClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.delete("/:_itemId", deleteClothingItem);
router.post("/", createClothingItem);
router.put("/:_itemId/likes", likeItem);
router.delete("/:_itemId/likes", dislikeItem);

module.exports = router;
