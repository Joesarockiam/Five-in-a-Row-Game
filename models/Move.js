const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    player: { type: Number, required: true },
    x: Number,
    y: Number
}, { timestamps: true });

module.exports = mongoose.model('Move', moveSchema);
