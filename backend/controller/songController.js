const SongModel=require('../models/songModel')
const { toggleFavorite } = require('../models/songModel');


exports.getSongs=(req,res)=>{
    res.json(SongModel.getAllSongs());
}

exports.createSongs=(req,res)=>{
    const song = SongModel.addSong(req.body);
  res.status(201).json(song);
}


exports.togglesongs = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedSong = toggleFavorite(id);
  
      if (!updatedSong) {
        return res.status(404).json({ message: "Song not found" });
      }
  
      return res.status(200).json({
        message: "Favorite status toggled successfully",
        song: updatedSong
      });
    } catch (error) {
      console.error("Toggle favorite error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


exports.updateSongs=(req,res)=>{
    const id = parseInt(req.params.id);
    SongModel.updateSong(id,req.body)
    const updatedSong = SongModel.getSongById(id);
    res.json(updatedSong);
}

exports.deleteSong=(req,res)=>{
    const id = parseInt(req.params.id);
    SongModel.deleteSong(id)
    res.status(204).json({ message: "Song deleted" });
}