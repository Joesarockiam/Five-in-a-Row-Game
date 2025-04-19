const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.post('/:gameId/save-board', boardController.saveBoard);
router.get('/load-board/:gameId', boardController.loadBoard);

module.exports = router;
