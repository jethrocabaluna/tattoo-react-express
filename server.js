const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

const tattoos = require('./sample-tattoos');
// const tattoos = {};

mongoose.connect('mongodb://localhost:27017/tattoo_app', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -------- Models -------- //
const Tattoo = require('./models/tattoo');

// app.get('/api/sample-tattoos', (req, res) => {
//   res.json(sampleTattoos);
// });

app.get('/api/tattoos', (req, res) => {
  // res.json(tattoos);
  Tattoo.find({}, (err, tattoos) => {
    if (err) {
      console.log(err);
      res.json(err);
      return;
    }
    res.json(tattoos);
  });
});

app.post('/api/tattoos', (req, res) => {
  // tattoos[`tattoo${Date.now()}`] = { name: req.body.tattooTitle, image: req.body.tattooImage };
  // res.json(tattoos);
  const newTattoo = { name: req.body.tattooTitle, image: req.body.tattooImage };

  Tattoo.create(newTattoo, (err, createdTattoo) => {
    if (err) {
      console.log(err);
      res.json(err);
      return;
    }
    res.json(createdTattoo);
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});