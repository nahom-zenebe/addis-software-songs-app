const SongModel = require('../models/songModel'); 

exports.getSongs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;

    const totalItems = await SongModel.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const items = await SongModel.find()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    res.json({
      items,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage,
      },
    });
  } catch (error) {
    console.error('Get songs error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createSongs = async (req, res) => {
  try {
    const song = new SongModel(req.body);
    const savedSong = await song.save();
    res.status(201).json(savedSong);
  } catch (error) {
    console.error('Create song error:', error);
    res.status(400).json({ message: 'Invalid song data', error });
  }
};

exports.togglesongs = async (req, res) => {
  try {
    const id = req.params.id; // MongoDB _id is string
    const song = await SongModel.findById(id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    song.favorite = !song.favorite;
    const updatedSong = await song.save();

    res.status(200).json({
      message: 'Favorite status toggled successfully',
      song: updatedSong,
    });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateSongs = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedSong = await SongModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSong) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(updatedSong);
  } catch (error) {
    console.error('Update song error:', error);
    res.status(400).json({ message: 'Invalid update data', error });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedSong = await SongModel.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(204).json({ message: 'Song deleted' });
  } catch (error) {
    console.error('Delete song error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
