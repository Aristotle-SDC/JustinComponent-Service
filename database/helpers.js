const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);
const cn = 'postgresql://jonathan:123@localhost:5432/tracks';
const db = pgp(cn);


const getTracks = (callback) => {
  db.query('SELECT * from tracks where id >= 9900001 and id <= 10000000')
  .then(data => callback(null, data))
  .catch(error => console.log(error) );
};

const getOneTrack = (id, callback) => {
  db.query(`SELECT * FROM tracks WHERE id = ${id}`)
  .then(data => callback(null, data))
  .catch(error => console.log(error));
};

const createOneTrack = (req, callback) => {
  db.query('SELECT count(*) AS exact_count FROM tracks')
  .then(data => data[0].exact_count)
  .then(id => {
    db.query(`INSERT INTO tracks VALUES
      (${Number(id)+1}, ${req.query.artist}, ${req.query.track}, ${req.query.album}, ${req.query.albumart},
       ${req.query.plays}, ${req.query.likes}, ${req.query.shares}, ${req.query.comments})`)
    .then(() => callback())
    .catch(error => console.log(error));
  });
};

const updateOneTrack = (req, callback) => {
  // console.log(req.query)
  db.query(`UPDATE tracks
            SET artist = ${req.query.artist},
              track = ${req.query.track},
              album = ${req.query.album},
              albumart = ${req.query.albumart},
              plays = ${Number(req.query.plays)},
              likes = ${Number(req.query.likes)},
              shares = ${Number(req.query.shares)},
              comments = ${Number(req.query.comments)}
            WHERE id = ${Number(req.query.id)}`)
  .then(() => callback())
  .catch(error => console.log('error'));
};

const deleteOneTrack = (id, callback) => {
  db.query(`DELETE FROM tracks WHERE id = ${id}`)
  .then(() => callback())
  .catch(error => console.log('error'));
}

const sortTracks = (data, currentTrack) => {
  // console.log(currentTrack);
  currentTrack = currentTrack[0];
  const relatedTracks = [];
  const playlists = [];
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].album === currentTrack.album && relatedTracks.length < 3) {
      relatedTracks.push(data[i]);
    } else if (data[i].album === currentTrack.album && relatedTracks.length >= 3
      && playlists.length < 3) {
      playlists.push(data[i]);
      if (playlists.length === 3) break;
    }
  }
  const filteredData = {
    currTrack: currentTrack,
    relTracks: relatedTracks,
    plists: playlists,
  };
  // console.log(filteredData);
  return filteredData;
};

module.exports = {
  getTracks,
  getOneTrack,
  createOneTrack,
  updateOneTrack,
  deleteOneTrack,
  sortTracks,
};
