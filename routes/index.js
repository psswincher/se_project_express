const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const routeNotFound = require("./routeNotFound");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use("/", routeNotFound);

module.exports = router;
