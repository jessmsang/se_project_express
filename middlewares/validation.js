const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const router = require("../routes");

const createItem = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().url().required(),
  }),
};

const createUser = router.post(
  "/users",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      avatar: Joi.string().url().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  })
);

module.exports = { createItem, createUser };
