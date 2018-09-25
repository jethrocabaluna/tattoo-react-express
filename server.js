const express = require('express');
const sampleTattoos = require('./sample-tattoos');

const app = express();

const port = process.env.PORT || 5000;

app.get('/api/sample-tattoos', (req, res) => {
  res.json(sampleTattoos);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});