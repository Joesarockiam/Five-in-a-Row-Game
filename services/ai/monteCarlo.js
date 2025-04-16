// Monte Carlo simulation: run random games and pick move with best win rate
const SIMULATIONS = 30;

function getBestMonteCarloMove(board, player = 'ai') {
  const moves = getAvailableMoves(board);
  let bestMove = null;
  let bestWinRate = -1;

  for (const [row, col] of moves) {
    let wins = 0;
    for (let i = 0; i < SIMULATIONS; i++) {
      const result = simulateRandomGame(makeMove(board, row, col, player), player);
      if (result === player) wins++;
    }
    const winRate = wins / SIMULATIONS;
    if (winRate > bestWinRate) {
      bestWinRate = winRate;
      bestMove = { row, col };
    }
  }

  return bestMove;
}

module.exports = { getBestMonteCarloMove };

// Helpers
const getAvailableMoves = require('./shared').getAvailableMoves;
const makeMove = require('./shared').makeMove;
const simulateRandomGame = require('./shared').simulateRandomGame;
