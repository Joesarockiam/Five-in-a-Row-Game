// Minimax algorithm for Five in a Row (basic depth-limited version)
const MAX_DEPTH = 2;

function minimax(board, depth, isMaximizing, player) {
  if (depth === 0 || isGameOver(board)) {
    return { score: evaluateBoard(board, player) };
  }

  const opponent = player === 'ai' ? 'user' : 'ai';
  const symbol = player === 'ai' ? 'O' : 'X';
  const bestMove = { score: isMaximizing ? -Infinity : Infinity };

  for (const [row, col] of getAvailableMoves(board)) {
    board[row][col] = isMaximizing ? symbol : (symbol === 'O' ? 'X' : 'O');
    const result = minimax(board, depth - 1, !isMaximizing, player);
    board[row][col] = null;

    if (isMaximizing && result.score > bestMove.score) {
      bestMove.score = result.score;
      bestMove.move = { row, col };
    } else if (!isMaximizing && result.score < bestMove.score) {
      bestMove.score = result.score;
      bestMove.move = { row, col };
    }
  }

  return bestMove;
}

function getBestMove(board, player = 'ai') {
  const { move } = minimax(board, MAX_DEPTH, true, player);
  return move;
}

module.exports = { getBestMove };

// Placeholder helper functions
const evaluateBoard = require('./shared').evaluateBoard;
const getAvailableMoves = require('./shared').getAvailableMoves;
const isGameOver = require('./shared').isGameOver;
