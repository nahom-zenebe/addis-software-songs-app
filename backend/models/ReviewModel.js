const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String
  }, { timestamps: true });
  
  module.exports = mongoose.model("Review", reviewSchema);
  