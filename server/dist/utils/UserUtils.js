"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserFromTeam = exports.searchUserByEmail = exports.getUserTeams = exports.userJoinTeam = exports.updateUserData = exports.getUserByID = void 0;
var Firestore_1 = require("../services/Firestore");
var FeedItem_1 = require("../types/FeedItem");
var FirestoreCollections_1 = __importDefault(require("../types/FirestoreCollections"));
var TeamsUtils_1 = require("./TeamsUtils");
var getUserByID = function (userID) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Firestore_1.readData)(FirestoreCollections_1.default.USERS, userID)];
            case 1:
                user = _a.sent();
                if (!(!user.teams || !user.password)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, Firestore_1.readDataNoCache)(FirestoreCollections_1.default.USERS, userID)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3: return [2 /*return*/, user];
        }
    });
}); };
exports.getUserByID = getUserByID;
var updateUserData = function (userID, userData) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, Firestore_1.addData)(FirestoreCollections_1.default.USERS, userID, userData)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.updateUserData = updateUserData;
var userJoinTeam = function (teamID, userID) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, exports.getUserByID)(userID)];
            case 1:
                user = _d.sent();
                _a = TeamsUtils_1.addFeedItem;
                _b = [teamID];
                _c = {};
                return [4 /*yield*/, (0, exports.getUserByID)(userID)];
            case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_c.userJoined = (_d.sent()).name, _c), FeedItem_1.FeedType.UserJoin]))];
            case 3:
                _d.sent();
                return [4 /*yield*/, (0, exports.updateUserData)(userID, __assign(__assign({}, user), { teams: __spreadArray(__spreadArray([], (user.teams || []), true), [teamID], false) }))];
            case 4: return [2 /*return*/, _d.sent()];
        }
    });
}); };
exports.userJoinTeam = userJoinTeam;
var getUserTeams = function (userID) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, Firestore_1.readData)(FirestoreCollections_1.default.USERS, userID)];
        case 1: return [2 /*return*/, (_a.sent()).teams];
    }
}); }); };
exports.getUserTeams = getUserTeams;
var searchUserByEmail = function (email, searchSize, ignoreEmail) { return __awaiter(void 0, void 0, void 0, function () {
    var users, searchResults;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Firestore_1.getSnapshotWhere)(FirestoreCollections_1.default.USERS, "email", ">=", email)
                    .where("email", "<=", email + "\uf8ff")
                    .get()];
            case 1:
                users = _a.sent();
                searchResults = [];
                users.forEach(function (doc) {
                    var user = doc.data();
                    delete user.password;
                    delete user.teams;
                    searchResults.push(user);
                });
                return [2 /*return*/, searchResults.filter(function (_a) {
                        var email = _a.email;
                        return email !== ignoreEmail;
                    }).filter(function (_, idx) { return idx <= searchSize - 1; })];
        }
    });
}); };
exports.searchUserByEmail = searchUserByEmail;
var removeUserFromTeam = function (userID, teamID) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, exports.getUserByID)(userID)];
            case 1:
                user = _c.sent();
                if (((_a = user.teams) === null || _a === void 0 ? void 0 : _a.findIndex(function (team) { return team === teamID; })) === -1)
                    return [2 /*return*/];
                (_b = user.teams) === null || _b === void 0 ? void 0 : _b.splice(user.teams.findIndex(function (team) { return team === teamID; }), 1);
                return [4 /*yield*/, (0, exports.updateUserData)(userID, user)];
            case 2: return [2 /*return*/, _c.sent()];
        }
    });
}); };
exports.removeUserFromTeam = removeUserFromTeam;
