// server.js (Backend - Node.js)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);

  socket.on('callUser', ({ userId, signalData }) => {
    io.to(userId).emit('callUser', { from: socket.id, signalData });
  });

  socket.on('acceptCall', ({ signal, to }) => {
    io.to(to).emit('callAccepted', signal);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

// ... existing code ...
server.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on Render or port 5000');
});
// ... existing code ...
