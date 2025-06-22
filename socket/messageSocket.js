const users = {};
let ioInstance = null;

const messageSocket = (io) => {
  ioInstance = io;
  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (!userId) {
      console.error("User ID is required for socket connection");
      io.emit("getOnlineUsers", Object.values(users));
    }
    users[socket.id] = userId;

    io.emit("sendMessage", (message) => {
      const recieverId = users[message.reciever];
      const senderId = users[message.sender];

      if (recieverId) {
        io.to(recieverId).emit("newMessage", message);
      }

      if (senderId) {
        io.to(senderId).emit("newMessage", message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
      delete users[socket.id];
      io.emit("getOnlineUsers", Object.values(users));
    });
  });
};

const getUsers = () => users;
const getIoInstance = () => ioInstance;

module.exports = {
  getUsers,
  getIoInstance,
  messageSocket,
};
