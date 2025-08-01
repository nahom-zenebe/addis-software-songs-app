const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number },
  genre: { type: String },
  duration: { type: Number }, 
  coverUrl: { type: String },
  trackNumber: { type: Number },
  composer: { type: String },
  releaseDate: { type: Date },
  releaseDate: { type: String },
  favorite: { type: Boolean, default: false },
  rating: { type: Number, min: 0, max: 5 },
  playCount: { type: Number, default: 0 }
},
{
  timestamps: true 
});

const Song = mongoose.model('Song', songSchema);

module.exports =  Song;
