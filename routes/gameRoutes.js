const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/new-game', gameController.startNewGame);
router.post('/:gameId/move/user', gameController.userMove);
router.get('/:gameId/move/ai', gameController.aiMove);

module.exports = router;