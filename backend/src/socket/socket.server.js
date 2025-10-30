// socket.server.js
const { Server } = require("socket.io");

function setupSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: process.env.FRONTEND_ORIGIN || "*" }
  });

 io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
  });
});
}

module.exports = setupSocketServer;
