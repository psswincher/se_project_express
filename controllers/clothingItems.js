const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  RESOURCE_NOT_FOUND,
  FORBIDDEN_REQUEST,
} = require("../utils/errors");
const { handleDefaultError, handleError } = require("../utils/errorHandler");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send({ data: clothingItems }))
    .catch((err) => handleDefaultError(err.message, res));
};

module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findById(req.params._id)
    .orFail(() => {
      const error = new RESOURCE_NOT_FOUND(
        `No matching item in database for id '${req.params._id}'`
      );
      throw error;
    })
    .then((item) => {
      console.log(item.owner._id);
      console.log(req.user);
      if (!item.owner._id.equals(req.user._id)) {
        throw new FORBIDDEN_REQUEST("User does not have permissions to delete");
      } else {
        ClothingItem.deleteOne({ _id: item._id })
          .then((deletedItem) => res.send({ data: deletedItem }))
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new BAD_REQUEST(
          `No matching item for id '${req.params._id}', id format is invalid.`
        );
        handleError(error, res);
      } else if (
        err instanceof FORBIDDEN_REQUEST ||
        err instanceof RESOURCE_NOT_FOUND
      ) {
        handleError(err, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, imageUrl, weather } = req.body;
  ClothingItem.create({ name, imageUrl, owner: req.user, weather })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new BAD_REQUEST(err.message);
        handleError(error, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      const error = new RESOURCE_NOT_FOUND(
        `No matching item in database for id '${req.params._id}'`
      );
      throw error;
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new BAD_REQUEST(
          `No matching item for id '${req.params._id}', id format is invalid.`
        );
        handleError(error, res);
      } else if (err instanceof RESOURCE_NOT_FOUND) {
        handleError(err, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      const error = new RESOURCE_NOT_FOUND(
        `No matching item for id ${req.params.id}`
      );
      throw error;
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new BAD_REQUEST(
          `No matching item for id '${req.params._id}', id format is invalid.`
        );
        handleError(error, res);
      } else if (err instanceof RESOURCE_NOT_FOUND) {
        handleError(err, res);
      } else {
        handleDefaultError(err.message, res);
      }
    });
};
