const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tracks', { useNewUrlParser: true });

let trackSchema = mongoose.Schema({
  id: Number,
  artist: String,
  track: String,
  album: String,
  albumart: String,
  plays: Number,
  likes: Number,
  shares: Number,
  comments: Number
});


let Track = mongoose.model('Track', trackSchema);

const getTracks = (callback) => {
  Track.find(function(err, data) {
    if (err) { console.log(err); }
    else { callback(null, data); }
  })
  .limit(10000);
};

const sortTracks = (data, id) => {
  console.log(data);
  // const trackId = id - 1 || 0;
  const currentTrack = data[id-9990000];
  const relatedTracks = [];
  const playlists = [];
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].album === currentTrack.album && relatedTracks.length < 3) {
      relatedTracks.push(data[i]);
    } else if (data[i].album === currentTrack.album && relatedTracks.length >= 3
      && playlists.length < 3) {
      playlists.push(data[i]);
    }
  }
  const filteredData = {
    currTrack: currentTrack,
    relTracks: relatedTracks,
    plists: playlists,
  };
  return filteredData;
};

module.exports = {
  getTracks,
  sortTracks,
};
