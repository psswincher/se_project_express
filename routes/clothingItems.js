const router = require("express").Router();
const {
  getClothingItem,
  deleteClothingItem,
  createClothingItem,
} = require("../controllers/clothingItems");

router.get("/items", getClothingItem);
router.delete("/items/:_itemId", deleteClothingItem);
router.post("/items", createClothingItem);

module.exports = router;
