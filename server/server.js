const express = require('express');
const path = require('path');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}!`);
});
