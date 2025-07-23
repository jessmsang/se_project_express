const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItemById,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");
const {
  validateCreateItem,
  validateItemIDFormat,
} = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", auth, validateCreateItem, createItem);
router.delete("/:itemId", auth, validateItemIDFormat, deleteItemById);
router.put("/:itemId/likes", auth, validateItemIDFormat, likeItem);
router.delete("/:itemId/likes", auth, validateItemIDFormat, dislikeItem);

module.exports = router;
