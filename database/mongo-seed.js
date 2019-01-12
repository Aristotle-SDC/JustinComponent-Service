console.time('seed');
const promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;
const data = require('./data.js');
const async = require('async');


const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

MongoClient.connect('mongodb://localhost:27017/Tracks', { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  let index = 0;
  var dbase = db.db('Tracks');
  var col = dbase.collection('tracks');
  var bulk = col.initializeUnorderedBulkOp();
  async.whilst(
    function() {return index < 10000000},
    function(callback) {
      index++;
      bulk.insert({
        id: index,
        artist: data.artists[getRandomInt(50000)],
        track: data.tracks[index-1],
        album: data.albums[getRandomInt(50000)],
        albumart: data.albumArts[getRandomInt(1000)],
        plays: getRandomInt(800000),
        likes: getRandomInt(23000),
        shares: getRandomInt(20000),
        comments: getRandomInt(1000)
      });
      if (index % 1000 === 0) {
        bulk.execute(function(err, result) {
          bulk = col.initializeUnorderedBulkOp();
          callback(err);
        });
      } else {
        process.nextTick(callback);
      }
    },
    function(err) {
      if (err) { console.error(err); }
      db.close();
      console.timeEnd('seed');
    }
  );
});



