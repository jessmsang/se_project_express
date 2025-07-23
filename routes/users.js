const router = require("express").Router();

const { getCurrentUser, patchCurrentUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateCreateUser } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateCreateUser, patchCurrentUser);

module.exports = router;
