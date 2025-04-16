const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/new-game', gameController.startNewGame);
router.post('/user-move', gameController.userMove);
router.post('/ai-move', gameController.aiMove);

module.exports = router;
