const SongModel=require('../models/songModel')



exports.getSongs=(req,res)=>{
    res.json(SongModel.getAllSongs());
}

exports.createSongs=(req,res)=>{
    const song = SongModel.addSong(req.body);
  res.status(201).json(song);
}


exports.updateSongs=(req,res)=>{
    const id = parseInt(req.params.id);
   SongModel.updateSong(id,req.body)
   res.json({ message: "Song updated" });

}

exports.deleteSong=(req,res)=>{
    const id = parseInt(req.params.id);
    SongModel.deleteSong(id)
    res.status(204).json({ message: "Song deleted" });
}