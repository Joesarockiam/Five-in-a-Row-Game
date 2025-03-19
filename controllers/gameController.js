const Game = require('../models/Game');
const minimax = require('../ai/minmax');

exports.createGame = async (req, res) => {
    try {
        const newGame = new Game({ board: Array(15).fill().map(() => Array(15).fill(0)) });
        await newGame.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.makeMove = async (req, res) => {
    try {
        const { gameId, x, y, player } = req.body;
        let game = await Game.findById(gameId);

        if (!game) return res.status(404).json({ error: "Game not found" });

        // ✅ Step 1: Validate Player Move
        if (game.board[x][y] !== 0) {
            return res.status(400).json({ error: "Cell already occupied" });
        }

        game.board[x][y] = player; // Player move
        game.playerTurn = 2; // Switch turn to AI

        // ✅ Step 2: Check for Player Win
        if (checkWin(game.board, x, y, player)) {
            game.status = "Player Wins!";
            await game.save();
            return res.json({ message: "Player wins!", board: game.board });
        }

        await game.save();

        // ✅ Step 3: AI Makes a Move Automatically
        const aiMove = minimax(game.board, 3, true, -Infinity, Infinity); // AI calculates move

        if (aiMove && aiMove.x !== undefined && aiMove.y !== undefined) {
            game.board[aiMove.x][aiMove.y] = 2;  // AI Move (AI = 2)
            game.playerTurn = 1; // Switch turn back to Player
        } else {
            return res.status(500).json({ error: "AI move failed" });
        }

        // ✅ Step 4: Check for AI Win
        if (checkWin(game.board, aiMove.x, aiMove.y, 2)) {
            game.status = "AI Wins!";
            await game.save();
            return res.json({ message: "AI wins!", board: game.board });
        }

        await game.save();

        res.json({
            message: "Move successful, AI moved automatically",
            board: game.board,
            aiMove
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Check for win condition (5 in a row)
function checkWin(board, x, y, player) {
    const directions = [
        [1, 0], [0, 1], [1, 1], [1, -1]  // Horizontal, Vertical, Diagonal, Anti-Diagonal
    ];

    for (let [dx, dy] of directions) {
        let count = 1;
        count += countInDirection(board, x, y, dx, dy, player);
        count += countInDirection(board, x, y, -dx, -dy, player);

        if (count >= 5) return true;
    }
    return false;
}

function countInDirection(board, x, y, dx, dy, player) {
    let count = 0, nx = x + dx, ny = y + dy;

    while (nx >= 0 && ny >= 0 && nx < 15 && ny < 15 && board[nx][ny] === player) {
        count++;
        nx += dx;
        ny += dy;
    }
    return count;
}

exports.getGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        res.json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};