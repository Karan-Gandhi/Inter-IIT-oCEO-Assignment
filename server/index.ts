import express from "express";
import cors from "cors";
import Entry from "./types/Entry";
import { Socket } from "socket.io";
import { addData, readData } from "./services/Firestore";
import CollegeScoreList from "./types/CollegeScoreList";

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

// Sorry I have written all this in a single file cause I was running out of time :(
socketServer.on("connection", (socket: Socket) => {
  console.log("User connected: " + socket.id);

  socket.on("new-entry", async (data: Entry, ack) => {
    // add to firebase and emit to all clients
    const collegeScoreList = await readData<CollegeScoreList>("Scores", data.collegeName);
    if (collegeScoreList) {
      collegeScoreList.games.push(data);
      collegeScoreList.score += data.points;
      await addData<CollegeScoreList>("Scores", data.collegeName, collegeScoreList);
    } else {
      await addData<CollegeScoreList>("Scores", data.collegeName, {
        collegeName: data.collegeName,
        score: data.points,
        games: [data],
      });
    }
    console.log("New entry: " + JSON.stringify(data));
    socketServer.emit(
      "new-entry",
      collegeScoreList || { collegeName: data.collegeName, score: data.points, games: [data] }
    );
    ack(data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

app.get("/", (_, res) => {
  res.send("Hello, world");
});

app.get("/api/entries", async (_, res) => {
  // get all entries from firebase and send to client
  res.send(await readData<CollegeScoreList>("Scores"));
});

http.listen(PORT, () => console.log("[S] Server started at port: " + PORT));
