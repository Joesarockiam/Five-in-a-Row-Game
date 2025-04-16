const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
  player: { type: String, enum: ['user', 'ai'], required: true },
  position: {
    row: { type: Number, required: true },
    col: { type: Number, required: true },
  },
  timestamp: { type: Date, default: Date.now },
});

// Main Game Schema
const gameSchema = new mongoose.Schema({
  board: { type: [[String]], required: true, default: () => Array.from({ length: 15 }, () => Array(15).fill(null)) },
  moves: [moveSchema], // Track move history
  isGameOver: {
    type: Boolean,
    default: false,
  },
  winner: { type: String, enum: ['user', 'ai', 'draw', null], default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` on save
gameSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export model
const Game = mongoose.model('Game', gameSchema,"Game");
module.exports = Game;
