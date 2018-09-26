const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

const tattoos = require('./sample-tattoos');
// const tattoos = {};

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/tattoo_app', { useNewUrlParser: true });

app.use(passport.initialize());
require('./config/passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -------- Models -------- //
const Tattoo = require('./models/tattoo');

// app.get('/api/sample-tattoos', (req, res) => {
//   res.json(sampleTattoos);
// });

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
      const token = req.user.token;
      res.redirect('http://localhost:3000?token=' + token);
  }
);

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