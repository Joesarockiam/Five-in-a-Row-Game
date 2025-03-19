// Evaluate the board for AI (returns a heuristic score)
function evaluateBoard(board) {
    let score = 0;

    // Example heuristic: Count AI's moves vs Player's moves
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            if (board[x][y] === 2) score += 10; // AI move
            if (board[x][y] === 1) score -= 10; // Player move
        }
    }

    return score;  // Return the heuristic value of the board
}

// Minimax Algorithm with Alpha-Beta Pruning
function minimax(board, depth, isMaximizing, alpha, beta) {
    // Base case: Check for terminal state (win/loss/draw)
    if (depth === 0) return { score: evaluateBoard(board) };

    let bestMove = null;
    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            if (board[x][y] === 0) {  // Empty spot
                board[x][y] = isMaximizing ? 2 : 1; // AI = 2, Player = 1
                let result = minimax(board, depth - 1, !isMaximizing, alpha, beta);
                let score = result.score;
                board[x][y] = 0;  // Undo move

                if (isMaximizing) {
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { x, y };
                    }
                    alpha = Math.max(alpha, score);
                } else {
                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = { x, y };
                    }
                    beta = Math.min(beta, score);
                }

                if (beta <= alpha) break;
            }
        }
    }

    return bestMove ? { x: bestMove.x, y: bestMove.y, score: bestScore } : { x: 7, y: 7, score: 0 };
}

module.exports = minimax;
