const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imagePath: { type: String, default: "" },
  biology: { type: String, default: "" },
  instagram: { type: String, default: "" },
  facebook: { type: String, default: "" },
  website: { type: String, default: "" },
  twitter: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  following: { type: Array, default: [] },
  followers: { type: Array, default: [] },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
