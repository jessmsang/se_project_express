const router = require("express").Router();
const { NotFoundError } = require("../utils/NotFoundError");

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use((req, res, next) => {
  next(new NotFoundError("Endpoint not found"));
});

module.exports = router;
