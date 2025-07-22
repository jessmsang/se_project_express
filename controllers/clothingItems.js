const Item = require("../models/clothingItem");
const {
  CREATED,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ForbiddenError,
} = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(Object.values(err.errors)[0].message));
      }
      return next(
        new InternalServerError("An error has occurred on the server.")
      );
    });
};

const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return next(
        new InternalServerError("An error has occurred on the server.")
      );
    });
};

const deleteItemById = (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return next(new ForbiddenError("You can only delete your own items"));
      }
      return Item.findByIdAndDelete(itemId);
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("the item ID format isn't valid"));
      }
      return next(
        new InternalServerError("An error has occurred on the server.")
      );
    });
};

const likeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("the item ID format isn't valid"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(
        new InternalServerError("An error has occurred on the server.")
      );
    });
};

const dislikeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("the item ID format isn't valid"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(
        new InternalServerError("An error has occurred on the server.")
      );
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItemById,
  likeItem,
  dislikeItem,
};
