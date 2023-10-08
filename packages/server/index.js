const express = require("express");
const { default: helmet } = require("helmet");
const { Server } = require("socket.io");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const {
  sessionMiddleware,
  wrap,
  corsConfig,
} = require("./controllers/serverController");
const {
  authorizeUser,
  initializeUser,
  addFriend,
  onDisconnect,
} = require("./controllers/socketController");

require("dotenv").config();

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", authRouter);

io.use(wrap(sessionMiddleware));
io.use(authorizeUser);

io.on("connect", (socket) => {
  initializeUser(socket);

  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });

  socket.on("disconnect", () => {
    onDisconnect(socket)
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
