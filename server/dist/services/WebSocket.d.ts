import { Server } from "http";
import User from "../types/User";
declare const createWebSocketServer: (expressServer: Server, path?: string) => any;
export declare const addEvent: <T>(mid: SocketMessageID, socket: WebSocket, callback: (data: T, user: User) => any) => void;
export declare const createRoomIfNotExists: (roomID: SocketRoomID) => void;
export declare const joinRoom: (id: SocketRoomID, socket: WebSocket) => void;
export declare const deleteRoom: (id: SocketRoomID) => void;
export declare const emitInRoom: <T>(id: SocketRoomID, mid: SocketMessageID, data: T) => void;
export declare const emitInRoomExcept: <T>(id: SocketRoomID, mid: SocketMessageID, data: T, except: WebSocket) => void;
export declare const removeSocketFromRoom: (id: SocketRoomID, socket: WebSocket) => void;
export declare const getSocketRoom: (socket: WebSocket) => string;
export declare const sendMessageToSocket: <T>(socket: WebSocket, mid: SocketMessageID, data: T) => void;
export default createWebSocketServer;
//# sourceMappingURL=WebSocket.d.ts.map