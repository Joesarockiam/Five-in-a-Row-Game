function isValidMove(board, row, col) {
    const inBounds = row >= 0 && row < 15 && col >= 0 && col < 15;
    if (!inBounds) return false;
    return !board[row][col];
  }
  
  module.exports = { isValidMove };
  

  function checkWinner(board, playerSymbol) {
    const size = 15;
    const winCount = 5;
  
    const directions = [
      [1, 0], // vertical
      [0, 1], // horizontal
      [1, 1], // diagonal down-right
      [1, -1], // diagonal down-left
    ];
  
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] !== playerSymbol) continue;
  
        for (let [dx, dy] of directions) {
          let count = 1;
          let x = row + dx;
          let y = col + dy;
  
          while (
            x >= 0 &&
            y >= 0 &&
            x < size &&
            y < size &&
            board[x][y] === playerSymbol
          ) {
            count++;
            if (count === winCount) return true;
            x += dx;
            y += dy;
          }
        }
      }
    }
  
    return false;
  }
  
  module.exports = { checkWinner };
  