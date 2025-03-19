const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    board: { type: [[Number]], required: true },  // 15x15 board
    playerTurn: { type: Number, default: 1 },  // 1 = Player, 2 = AI
    winner: { type: Number, default: 0 }  // 0 = No winner, 1 = Player, 2 = AI
});

module.exports = mongoose.model('Game', gameSchema, 'Game');
