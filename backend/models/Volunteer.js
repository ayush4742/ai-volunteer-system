const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  location: String,
  availability: Boolean,
  rating: Number,
});

module.exports = mongoose.model("Volunteer", volunteerSchema);