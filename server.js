require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const gameRoutes = require('./routes/gameRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/game', gameRoutes);
app.use('/api/ai', aiRoutes);

// WebSocket connection
io.on('connection', (socket) => {
    console.log('Player connected:', socket.id);

    socket.on('move', (data) => {
        io.emit('move', data); // Broadcast move to other players
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
