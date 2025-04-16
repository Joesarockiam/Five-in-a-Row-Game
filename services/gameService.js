const Game = require('../models/Game');
const { getBestMove } = require('./ai/minimax');
const { getBestHeuristicMove } = require('./ai/heuristic');
const { getBestMonteCarloMove } = require('./ai/monteCarlo');

// Choose AI strategy dynamically based on some logic
function decideBestAlgorithm(board) {
  // For now: rotate between all three
  const moveCount = board.flat().filter(cell => cell).length;
  if (moveCount % 3 === 0) return getBestMove;
  if (moveCount % 3 === 1) return getBestHeuristicMove;
  return getBestMonteCarloMove;
}

async function handleAIMove(gameId) {
  const game = await Game.findById(gameId);
  if (!game || game.isGameOver) throw new Error('Game not found or already over');

  const algorithm = decideBestAlgorithm(game.board);
  const move = algorithm(game.board, 'ai');

  if (!move) throw new Error('AI could not find a move.');

  game.board[move.row][move.col] = 'O';
  game.moves.push({
    player: 'ai',
    position: { row: move.row, col: move.col },
  });

  // TODO: Check win condition
  await game.save();
  return move;
}

module.exports = {
  handleAIMove,
};
