const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const Promise = require('bluebird');

const getTracks = require('../database/helpers.js').getTracks;
const sortTracks = require('../database/helpers.js').sortTracks;
const getOneTrack = require('../database/helpers.js').getOneTrack;
const createOneTrack = require('../database/helpers').createOneTrack;
const updateOneTrack = require('../database/helpers').updateOneTrack;
const deleteOneTrack = require('../database/helpers').deleteOneTrack;

const app = express();
// app.set('port', process.env.PORT || 3001);

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
// app.use(cors());
// app.use(express.static(`${__dirname}/../client/dist`));
app.use('/', express.static('./client/dist/'));
app.use(/\/\d+\//, express.static('./client/dist/'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// console.time('get')
app.get('/:id', (req, res) => {
  // res.send('hello');
  let id = req.params.id;
  let currentTrack;
  getOneTrack(id, (err, data) => {
    if (err) return err;
    currentTrack = data;
  });
  getTracks((err, data) => {
    // console.log(currentTrack);
    if (err) return err;
    const sortedTracks = sortTracks(data, currentTrack);
    res.send(sortedTracks);
    // console.timeEnd('get');
  });
});

/* CRUD operations */

// Create a new item
// format:
// http://localhost:3001/api?artist='artist'&track='track'&album='album'&albumart='albumart'&plays=1&likes=1&shares=1&comments=1
app.post('/api/track', (req, res) => {
  createOneTrack(req, () => {
    res.send('Added one new track to database');
  });
});

// Read an item
app.get('/api/track/:id', (req, res) => {
  const id = req.params.id;
  getOneTrack(id, (err, data) => {
    if (err) return err;
    res.send(data);
  });
});

// Update an item
// format same as post
app.put('/api/track', (req, res) => {
  updateOneTrack(req, () => {
    res.send('Updated selected track');
  });
});

// Delete an item
app.delete('/api/track/:id', (req, res) => {
  const id = req.params.id;
  deleteOneTrack(id, () => {
    res.send('Deleted selected track');
  });
})

/* set up server connection */
const port = 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});




