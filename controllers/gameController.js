const Game = require('../models/Game');
const { handleAIMove } = require('../services/gameService');

// Start a new game
exports.startNewGame = async (req, res) => {
  try {
    const newGame = new Game(); // will use default board
    await newGame.save();
    res.status(201).json({ gameId: newGame._id, board: newGame.board });
  } catch (error) {
    res.status(500).json({ message: 'Failed to start new game', error });
  }
};

// Handle user move
exports.userMove = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { row, col } = req.body;
    console.log(gameId);
    

    const game = await Game.findById(gameId);
    if (!game || game.isGameOver) {
      return res.status(400).json({ message: 'Game not found or already over' });
    }

    if (game.board[row][col]) {
      return res.status(400).json({ message: 'Cell already taken' });
    }

    game.board[row][col] = 'X';
    game.moves.push({ player: 'user', position: { row, col } });
    await game.save();

    res.status(200).json({ message: 'Move accepted', board: game.board });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process user move', error });
  }
};

// Handle AI move
exports.aiMove = async (req, res) => {
  try {
    const { gameId } = req.params;
    const move = await handleAIMove(gameId);
    res.status(200).json({ message: 'AI moved', move });
  } catch (error) {
    res.status(500).json({ message: 'Failed to make AI move', error });
  }
};
