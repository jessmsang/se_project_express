const Item = require("../models/clothingItem");
const {
  SUCCESS,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      console.log(err.message);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: err.message,
        });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: err.message,
      });
    });
};

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: err.message,
      });
    });
};

const deleteItemById = (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: err.message,
        });
      } else if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: err.message,
        });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: err.message,
      });
    });
};

const likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: err.message,
        });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: err.message,
        });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: err.message,
      });
    });
};

const dislikeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: err.message,
        });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: err.message,
        });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: err.message,
      });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItemById,
  likeItem,
  dislikeItem,
};
