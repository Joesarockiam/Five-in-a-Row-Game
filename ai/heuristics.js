function evaluateBoard(board) {
    let score = 0;
    score += countPattern(board, '11111') * 100000; // Five in a row
    score += countPattern(board, '011110') * 5000;  // Open four
    score += countPattern(board, '01110') * 1000;   // Open three
    score -= countPattern(board, '22222') * 100000; // Opponent five in a row
    score -= countPattern(board, '022220') * 5000;  // Opponent open four
    return score;
}

function countPattern(board, pattern) {
    let count = 0;
    let regex = new RegExp(pattern, 'g');
    board.forEach(row => count += (row.join('').match(regex) || []).length);
    return count;
}
