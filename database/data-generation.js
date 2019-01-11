// console.time();
const faker = require('faker');

// 10M tracks
// 50K artists
// 50k albums
// 10000 album imgs
const tracks = [];
const albumArts = [];
const artists = [];
const albums = [];

for (var i = 0; i < 10000000; i++) {
  if (i < 1000) {
    albumArts[i] = faker.random.image();
  }
  if (i < 50000) {
    artists[i] = faker.name.findName();
    albums[i] = `${faker.commerce.product()} ${faker.commerce.product()}`
  }
  tracks[i] = `${faker.lorem.word()} ${faker.lorem.word()}`;
}

// console.timeEnd();

module.exports = {
  tracks,
  albumArts,
  artists,
  albums,
}
