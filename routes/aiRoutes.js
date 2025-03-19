const express = require('express');
const { getAIMove } = require('../controllers/aiController');

const router = express.Router();

// Get AI move using Minimax
router.get('/:id', getAIMove);

module.exports = router;
