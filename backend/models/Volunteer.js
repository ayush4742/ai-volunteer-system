const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: String,
  location: String,
  skills: [String],
  availability: Boolean,
  rating: Number,

  // 🔥 ADD THIS (IMPORTANT)
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("Volunteer", volunteerSchema);