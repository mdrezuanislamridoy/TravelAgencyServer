const app = require("./App");
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { messageSocket } = require("./socket/messageSocket");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

messageSocket(io);

const port = process.env.PORT || 3005;
server.listen(port, () => {
  console.log("App is listening to port : ", port);
});
