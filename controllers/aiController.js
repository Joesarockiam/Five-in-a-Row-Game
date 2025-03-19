const Game = require('../models/Game');
const minimax = require('../ai/minmax');

exports.getAIMove = async (req, res) => {
   const {id} = req.params;
    try {
        const game = await Game.findById(id);
        console.log(game);
        
        const aiMove = minimax(game.board, 3, true, -Infinity, Infinity);
        console.log(aiMove)
        

        game.board[aiMove.x][aiMove.y] = 2;
        game.playerTurn = 1;
        await game.save();

        res.json(aiMove);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
