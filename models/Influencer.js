// models/Influencer.js
const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema({
  name: String,
  youtubeUrl: String,
  referralLink: String,
  slug: { type: String, unique: true }
});

module.exports = mongoose.model("Influencer", influencerSchema);