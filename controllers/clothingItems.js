const ClothingItem = require("../models/clothingItem");
const {
  INVALID_ITEM_DATA,
  NO_MATCHING_ITEM_ID,
  ROUTE_CAST_ERROR,
} = require("../utils/errors");
const { handleDefaultError, handleError } = require("../utils/errorHandler");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send({ data: clothingItems }))
    .catch((err) => handleDefaultError(err.message, res));
};

module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params._itemId)
    .orFail(() => {
      const error = new NO_MATCHING_ITEM_ID(
        `No matching item in database for id '${req.params._itemId}'`
      );
      throw error;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new ROUTE_CAST_ERROR(
          `No matching item for id '${req.params._itemId}', id format is invalid.`
        );
        handleError(error, res);
      } else if (err instanceof NO_MATCHING_ITEM_ID) {
        handleError(err, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, imageUrl, weather } = req.body;
  ClothingItem.create({ name, imageUrl, owner: req.user._id, weather })
    .then((clothingItem) => res.status(200).send({ data: clothingItem }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new INVALID_ITEM_DATA(err.message);
        handleError(error, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params._itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      const error = new NO_MATCHING_ITEM_ID(
        `No matching item in database for id '${req.params._itemId}'`
      );
      throw error;
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new ROUTE_CAST_ERROR(
          `No matching item for id '${req.params._itemId}', id format is invalid.`
        );
        handleError(error, res);
      } else if (err instanceof NO_MATCHING_ITEM_ID) {
        handleError(err, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params._itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .then((data) => res.status(200).send(data))
    .orFail(() => {
      const error = new NO_MATCHING_ITEM_ID(
        `No matching user for id ${req.params.id}`
      );
      throw error;
    })
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new ROUTE_CAST_ERROR(
          `No matching item for id '${req.params._itemId}', id format is invalid.`
        );
        handleError(error, res);
      } else if (err instanceof NO_MATCHING_ITEM_ID) {
        handleError(err, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};
