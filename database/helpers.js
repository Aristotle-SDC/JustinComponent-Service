const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);
const cn = 'postgresql://jonathan:123@localhost:5432/tracks';
const db = pgp(cn);


const getTracks = (callback) => {
  db.query('SELECT * from tracks where id >= 9990000 and id < 10000000')
  .then(data => callback(null, data))
  .catch(error => console.log(error) );
};

const sortTracks = (data, id) => {
  // console.log(data);
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
