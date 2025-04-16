// Heuristic search — pick move based on scoring patterns

function getBestHeuristicMove(board, player = 'ai') {
    const symbol = player === 'ai' ? 'O' : 'X';
    let bestScore = -Infinity;
    let bestMove = null;
  
    for (const [row, col] of getAvailableMoves(board)) {
      board[row][col] = symbol;
      const score = evaluateBoard(board, player);
      board[row][col] = null;
  
      if (score > bestScore) {
        bestScore = score;
        bestMove = { row, col };
      }
    }
  
    return bestMove;
  }
  
  module.exports = { getBestHeuristicMove };
  
  // Helpers
  const evaluateBoard = require('./shared').evaluateBoard;
  const getAvailableMoves = require('./shared').getAvailableMoves;
  