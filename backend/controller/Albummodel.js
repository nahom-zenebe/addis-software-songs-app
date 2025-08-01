const Album = require("../models/Albummodel");

exports.createAlbum = async (req, res) => {
  try {
    const album = await Album.create(req.body);
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("songs");
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("songs");
    if (!album) return res.status(404).json({ error: "Album not found" });
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.json({ message: "Album deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
