const express = require('express')
const app = express()
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const port = process.env.PORT || 8080;
const io = new Server(server);
var cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    console.log(`User ${socket.id} joining ${room}`);
    socket.join(room);
    io.to(room).emit('notification', `${socket.id} đã vào phòng 102`);

  });
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });

  

  socket.on('chat message', (msg) => {
    //socket.emit('chat message', msg);
    io.to('102').emit('chat message', msg);

  });
});

server.listen(port, () => {
  console.log('listening on *:', port);
});