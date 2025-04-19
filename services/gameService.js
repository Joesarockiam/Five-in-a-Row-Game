const Game = require('../models/Game');
const { getBestMove } = require('./ai/minimax');
const { getBestHeuristicMove } = require('./ai/heuristic');
const { getBestMonteCarloMove } = require('./ai/monteCarlo');
const { getBestBlockingMove } = require('./ai/blockingAI');

function decideBestAlgorithm(board) {
  const moveCount = board.flat().filter(cell => cell).length;

  // Always block if user's last move makes 3-in-a-row
  if (shouldBlock(board)) return getBestBlockingMove;

  // Else rotate between algorithms
  if (moveCount % 3 === 0) return getBestMove;
  if (moveCount % 3 === 1) return getBestHeuristicMove;
  return getBestMonteCarloMove;
}

function shouldBlock(board) {
  const userSymbol = 'X';
  const directions = [[0,1],[1,0],[1,1],[1,-1]];

  for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
      if (board[row][col] !== userSymbol) continue;
      for (const [dr, dc] of directions) {
        let count = 1;
        let r = row + dr;
        let c = col + dc;
        while (isValid(r, c) && board[r][c] === userSymbol) {
          count++;
          r += dr;
          c += dc;
        }
        if (count >= 3) return true;
      }
    }
  }
  return false;
}

function isValid(row, col) {
  return row >= 0 && row < 15 && col >= 0 && col < 15;
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

  await game.save();
  return move;
}

module.exports = {
  handleAIMove,
};
