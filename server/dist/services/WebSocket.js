"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToSocket = exports.getSocketRoom = exports.removeSocketFromRoom = exports.emitInRoomExcept = exports.emitInRoom = exports.deleteRoom = exports.joinRoom = exports.createRoomIfNotExists = exports.addEvent = void 0;
var ws_1 = __importDefault(require("ws"));
var SocketMessage_1 = require("../types/SocketServer/SocketMessage");
var AuthUtils_1 = require("../utils/AuthUtils");
var rooms = new Map();
var createWebSocketServer = function (expressServer, path) {
    var websocketServer = new ws_1.default.Server({ noServer: true, path: path });
    expressServer.on("upgrade", function (req, socket, head) {
        websocketServer.handleUpgrade(req, socket, head, function (webSocket) {
            websocketServer.emit("connection", webSocket, req);
        });
        websocketServer.on("error", function (error) { return console.log(error); });
    });
    return websocketServer;
};
var addEvent = function (mid, socket, callback) {
    socket.on("message", function (data) {
        try {
            var message_1 = (0, SocketMessage_1.createSocketMessage)(data);
            if (!message_1.Authorization)
                return socket.close();
            (0, AuthUtils_1.verifyAccessToken)(message_1.Authorization, function (error, user) {
                if (error)
                    return socket.close();
                user === null || user === void 0 ? true : delete user.iat;
                user === null || user === void 0 ? true : delete user.exp;
                if (message_1.id === mid)
                    callback(message_1.body, user);
            });
        }
        catch (_a) {
            socket.close(); // the socket will close if it recieves badly formated text and prevent the server from crashing
        }
    });
};
exports.addEvent = addEvent;
var createRoomIfNotExists = function (roomID) {
    if (!rooms.has(roomID))
        rooms.set(roomID, []);
};
exports.createRoomIfNotExists = createRoomIfNotExists;
var joinRoom = function (id, socket) {
    var room = rooms.get(id);
    if (room)
        room.push(socket);
};
exports.joinRoom = joinRoom;
var deleteRoom = function (id) {
    rooms.delete(id);
};
exports.deleteRoom = deleteRoom;
var emitInRoom = function (id, mid, data) {
    var room = rooms.get(id);
    var socketMessage = { id: mid, body: data };
    if (room)
        room.forEach(function (socket) { return socket.send(JSON.stringify(socketMessage)); });
};
exports.emitInRoom = emitInRoom;
var emitInRoomExcept = function (id, mid, data, except) {
    var room = rooms.get(id);
    var socketMessage = { id: mid, body: data };
    if (room)
        room.forEach(function (socket) { return socket !== except && socket.send(JSON.stringify(socketMessage)); });
};
exports.emitInRoomExcept = emitInRoomExcept;
var removeSocketFromRoom = function (id, socket) {
    var room = rooms.get(id);
    if (room)
        room.splice(room.indexOf(socket), 1);
};
exports.removeSocketFromRoom = removeSocketFromRoom;
var getSocketRoom = function (socket) {
    var res = "";
    rooms.forEach(function (room, id) {
        if (room.includes(socket))
            res = id;
    });
    return res;
};
exports.getSocketRoom = getSocketRoom;
var sendMessageToSocket = function (socket, mid, data) {
    var socketMessage = { id: mid, body: data };
    socket.send(JSON.stringify(socketMessage));
};
exports.sendMessageToSocket = sendMessageToSocket;
exports.default = createWebSocketServer;
// (() => {
//   (function report() {
//     const usage = process.memoryUsage();
//     const newUsage: { [key: string]: string } = {};
//     // usage.
//     for (let key of Object.keys(usage)) {
//       newUsage[key] = Math.round((usage[key as "arrayBuffers" | "external" | "heapTotal" | "heapUsed" | "rss"] || 0) / 1024 / 1024) + "MB";
//     }
//     console.log(new Date());
//     console.log("  MEM:", newUsage);
//     console.log("");
//     setTimeout(report, 5000);
//   })();
// })();
