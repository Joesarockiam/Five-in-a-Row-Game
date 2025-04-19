const { getAvailableMoves } = require('./shared');

function getBestBlockingMove(board, player = 'ai') {
  const userSymbol = 'X';
  const aiSymbol = 'O';
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1] // horiz, vert, diag, anti-diag
  ];

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

        if (count >= 3) {
          const before = [row - dr, col - dc];
          const after = [r, c];

          if (isValid(before[0], before[1]) && !board[before[0]][before[1]]) {
            return { row: before[0], col: before[1] };
          }

          if (isValid(after[0], after[1]) && !board[after[0]][after[1]]) {
            return { row: after[0], col: after[1] };
          }
        }
      }
    }
  }

  // Fallback: pick any valid move
  const moves = getAvailableMoves(board);
  return moves.length ? { row: moves[0][0], col: moves[0][1] } : null;
}

function isValid(row, col) {
  return row >= 0 && row < 15 && col >= 0 && col < 15;
}

module.exports = { getBestBlockingMove };
