const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: String,
  location: String,
  priority: String,

  // 🔥 MUST ADD THESE
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("Problem", problemSchema);