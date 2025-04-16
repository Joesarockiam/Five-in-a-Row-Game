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
    // Simple scoring for now (can improve with patterns)
    // +10 for 3-in-a-row, +100 for 4, +1000 for 5
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
  
  module.exports = {
    getAvailableMoves,
    evaluateBoard,
    isGameOver,
    makeMove,
    simulateRandomGame,
  };
  