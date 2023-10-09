"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var PORT = 5000;
var app = (0, express_1.default)();
var http = require("http").Server(app);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var socketServer = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
    },
});
socketServer.on("connection", function (socket) {
    console.log("User connected: " + socket.id);
    socket.on("disconnect", function () {
        console.log("User disconnected: " + socket.id);
    });
});
app.get("/", function (_, res) {
    res.send("Hello, world");
});
http.listen(PORT, function () { return console.log("[S] Server started at port: " + PORT); });
