const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    // google profile object properties added to user schema
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
