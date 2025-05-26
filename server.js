const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const generateRandomName = () => 'Kullanici_' + Math.floor(Math.random() * 10000);

io.on('connection', (socket) => {
  const username = generateRandomName();
  socket.username = username;

  io.emit('chat message', `${username} sohbete katıldı.`);

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${socket.username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    io.emit('chat message', `${socket.username} ayrıldı.`);
  });
});

server.listen(3000, () => {
  console.log('http://localhost:3000 adresinde çalışıyor');
});