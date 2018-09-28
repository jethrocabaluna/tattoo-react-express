const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000;

const tattoos = require('./sample-tattoos');
// const tattoos = {};

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/tattoo_app', { useNewUrlParser: true });

app.use(session({
  secret: "tattoo",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
}); 

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
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
      const token = req.user.token;
      res.redirect('http://localhost:3000?token=' + token);
  }
);

app.get('/isLoggedIn', (req, res) => {
  if (req.user) {
    res.json({ isLoggedIn: true });
    return;
  }
  res.json({ isLoggedIn: false });
});

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

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000');
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