const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: String,
  location: String,
  priority: String,
});

module.exports = mongoose.model("Problem", problemSchema);