const express = require('express');
const { createGame, makeMove, getGame } = require('../controllers/gameController');

const router = express.Router();

// Create a new game
router.post('/start', createGame);

// Make a move
router.post('/move', makeMove);

// Get game state
router.get('/:id', getGame);

module.exports = router;
