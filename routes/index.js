const router = require("express").Router();
const userRouter = require("./users");
const signUpRouter = require("./signup");
const signinRouter = require("./signin");
const clothingItemRouter = require("./clothingItems");
const routeNotFound = require("./routeNotFound");
const { auth } = require("../middlewares/auth");

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);
router.use("/signin", signinRouter);
router.use("/signup", signUpRouter);
router.use("/", routeNotFound);

module.exports = router;
