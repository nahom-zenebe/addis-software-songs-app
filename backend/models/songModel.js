let songs = [
    {
      id: 1,
      title: "Hello",
      artist: "Adele",
      album: "25",
      year: 2015,
      genre: "Pop",
      duration: 295, 
      coverUrl: "https://example.com/adele-hello.jpg",
      trackNumber: 1,
      composer: "Adele Adkins",
      releaseDate: "2015-10-23",
      lyrics: "Hello, it's me...",
      favorite: false,
      rating: 4.7,
      playCount: 10000
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      year: 2020,
      genre: "Synthwave",
      duration: 200, 
      coverUrl: "https://example.com/blinding-lights.jpg",
      trackNumber: 9,
      composer: "Abel Tesfaye",
      releaseDate: "2019-11-29",
      lyrics: "I've been tryna call...",
      favorite: true,
      rating: 4.9,
      playCount: 25000
    },
    {
      id: 3,
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "Divide",
      year: 2017,
      genre: "Pop",
      duration: 233, 
      coverUrl: "https://example.com/shape-of-you.jpg",
      trackNumber: 4,
      composer: "Ed Sheeran",
      releaseDate: "2017-01-06",
      lyrics: "The club isn't the best place to find a lover...",
      favorite: true,
      rating: 4.8,
      playCount: 5234
    }
  ];

  const getAllSongs=()=>songs;

  const addSong=(song)=>{
    const newSongs={...song, id: Date.now()}
    songs.push(newSongs)
    return songs
  }

  const updateSong=(id,data)=>{

    songs = songs.map(song => song.id === id ? { ...song, ...data } : song);
  }

  const deleteSong=(id)=>{
    songs=songs.filter(song=>song.id!==id);

  }
  module.exports = {
    getAllSongs,
    addSong,
    updateSong,
    deleteSong,
  };