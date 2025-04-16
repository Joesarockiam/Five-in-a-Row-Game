const Game = require('../models/Game');

// Save current game state (on restart)
exports.saveBoard = async (req, res) => {
  try {
    const { gameId } = req.body;
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    game.isGameOver = true;
    await game.save();

    res.status(200).json({ message: 'Game saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save game', error });
  }
};

// Get a saved game (optional)
exports.loadBoard = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    res.status(200).json({ board: game.board, moves: game.moves });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load game', error });
  }
};
