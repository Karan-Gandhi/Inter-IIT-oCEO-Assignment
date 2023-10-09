import express from "express";
import cors from "cors";
import socketio from "socket.io";

const PORT = 5000;
const app = express();
const http = require("http").Server(app);

app.use(express.json());
app.use(cors());

const socketServer = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketServer.on("connection", (socket: any) => {
  console.log("User connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

app.get("/", (_, res) => {
  res.send("Hello, world");
});

http.listen(PORT, () => console.log("[S] Server started at port: " + PORT));
