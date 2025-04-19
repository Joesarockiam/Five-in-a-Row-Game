const Game = require('../models/Game');
const { handleAIMove } = require('../services/gameService');
const { checkWinner } = require('../utils/boardUtils');

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

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.isGameOver) {
      return res.status(400).json({ message: 'Match is over. Winner: ' + game.winner });
    }

    if (game.board[row][col]) {
      return res.status(400).json({ message: 'Cell already taken' });
    }

    game.board[row][col] = 'X';
    game.moves.push({ player: 'user', position: { row, col } });

    const result = checkWinner(game.board, 'X');
    if (result.winner) {
      game.isGameOver = true;
      game.winner = 'user';
      await game.save();
      return res.status(200).json({
        message: 'Move accepted. Match is over. Winner: user',
        board: game.board,
        winner: game.winner,
        winningCells: result.cells || []
      });
    }

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

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.isGameOver) {
      return res.status(400).json({ message: 'Match is over. Winner: ' + game.winner });
    }

    const move = await handleAIMove(gameId);
    console.log(move);
    
    if (!move) {
      return res.status(400).json({ message: 'No valid AI move found' });
    }

    const { row, col } = move;
    game.board[row][col] = 'O';
    game.moves.push({ player: 'ai', position: { row, col } });

    const result = checkWinner(game.board, 'O');
    if (result.winner) {
      game.isGameOver = true;
      game.winner = 'ai';
      await game.save();
      return res.status(200).json({
        message: 'Move accepted. Match is over. Winner: ai',
        move,
        board: game.board,
        winner: game.winner,
        winningCells: result.cells || []
      });
    }

    await game.save();
    res.status(200).json({ message: 'Move accepted', move, board: game.board });

  } catch (error) {
    res.status(500).json({ message: 'Failed to make AI move', error });
  }
};
