const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "This field is required."],
    minlength: [2, "This field must be at least 2 characters long."],
    maxlength: [30, "This field must be no more than 30 characters long."],
  },
  weather: {
    type: String,
    required: [true, "This field is required."],
    enum: {
      values: ["hot", "warm", "cold"],
      message: `Weather must be either 'hot', 'warm', or 'cold'`,
    },
  },
  imageUrl: {
    type: String,
    required: [true, "This field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Please enter a valid URL.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "This field is required."],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("item", clothingItemSchema);
