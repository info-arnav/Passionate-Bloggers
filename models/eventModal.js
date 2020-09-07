const mongoose = require("mongoose");
const eventRegisteration = new mongoose.Schema({
  name: String,
  date: {
    type: String,
    default: new Date(),
  },
  subject: String,
  blog: String,
});

const eventModel = mongoose.model("eventModel", eventRegisteration);

module.exports = eventModel;