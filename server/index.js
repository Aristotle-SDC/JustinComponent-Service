const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const getTracks = require('../database/helpers.js').getTracks;
const sortTracks = require('../database/helpers.js').sortTracks;

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

app.get('/:id', (req, res) => {
  // res.send('hello');
  let id = req.params.id;
  getTracks((err, data) => {
    if (err) return err;
    const sortedData = sortTracks(data, id);
    // console.log(sortedData);
    res.send(sortedData);
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
