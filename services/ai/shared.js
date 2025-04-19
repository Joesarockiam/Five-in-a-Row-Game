function getAvailableMoves(board) {
  const moves = [];
  for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
      if (!board[row][col]) moves.push([row, col]);
    }
  }
  return moves;
}

function evaluateBoard(board, player) {
  // Simple scoring placeholder
  const symbol = player === 'ai' ? 'O' : 'X';
  let score = 0;
  // Add pattern matching here
  return score;
}

function isGameOver(board) {
  // Placeholder – implement proper win condition
  return false;
}

function makeMove(board, row, col, player) {
  const copy = board.map(r => [...r]);
  copy[row][col] = player === 'ai' ? 'O' : 'X';
  return copy;
}

function simulateRandomGame(board, player) {
  let current = player;
  let tempBoard = board.map(r => [...r]);
  while (!isGameOver(tempBoard)) {
    const moves = getAvailableMoves(tempBoard);
    if (!moves.length) return 'draw';
    const [row, col] = moves[Math.floor(Math.random() * moves.length)];
    tempBoard[row][col] = current === 'ai' ? 'O' : 'X';
    current = current === 'ai' ? 'user' : 'ai';
  }
  // Dummy return — implement proper winner detection
  return Math.random() > 0.5 ? player : (player === 'ai' ? 'user' : 'ai');
}

function isWinningMove(board, row, col, symbol) {
  const directions = [
    [1, 0], // vertical
    [0, 1], // horizontal
    [1, 1], // diagonal \
    [1, -1], // diagonal /
  ];

  for (const [dx, dy] of directions) {
    let count = 1;

    for (let dir = -1; dir <= 1; dir += 2) {
      let r = row + dx * dir;
      let c = col + dy * dir;

      while (
        r >= 0 && r < 15 &&
        c >= 0 && c < 15 &&
        board[r][c] === symbol
      ) {
        count++;
        r += dx * dir;
        c += dy * dir;
      }
    }

    if (count >= 5) return true;
  }

  return false;
}

module.exports = {
  getAvailableMoves,
  evaluateBoard,
  isGameOver,
  makeMove,
  simulateRandomGame,
  isWinningMove,
};
