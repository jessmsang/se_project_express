const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "This field is required."],
    minlength: [2, "This field must be at least 2 characters long."],
    maxlength: [30, "This field must be no more than 30 characters long."],
  },
  avatar: {
    type: String,
    required: [true, "This field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Please enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "This field is required."],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "This field is required."],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const UnauthorizedError = new Error("Invalid email or password");
        UnauthorizedError.name = "UnauthorizedError";
        UnauthorizedError.statusCode = 401;
        return Promise.reject(UnauthorizedError);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const UnauthorizedError = new Error("Invalid email or password");
          UnauthorizedError.name = "UnauthorizedError";
          UnauthorizedError.statusCode = 401;
          return Promise.reject(UnauthorizedError);
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
