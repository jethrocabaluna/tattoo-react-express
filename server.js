const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const tattoos = require('./sample-tattoos');
// const tattoos = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/sample-tattoos', (req, res) => {
//   res.json(sampleTattoos);
// });

app.get('/api/tattoos', (req, res) => {
  res.json(tattoos);
});

app.post('/api/tattoos', (req, res) => {
  tattoos[`tattoo${Date.now()}`] = { name: req.body.tattooTitle, image: req.body.tattooImage };
  res.json(tattoos);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});