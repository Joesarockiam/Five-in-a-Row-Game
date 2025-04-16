const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');
const boardRoutes = require('./routes/boardRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', gameRoutes);
app.use('/api', boardRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
