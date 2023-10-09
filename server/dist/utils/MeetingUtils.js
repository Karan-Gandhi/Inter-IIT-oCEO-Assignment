"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeetingParticipants = exports.leaveMeeting = exports.startMeetingIfNotStarted = exports.generateMeetingID = exports.createMeeting = exports.updateMeeting = exports.getMeetingByID = exports.joinMeeting = exports.startMeeting = exports.meetingIsStarted = void 0;
var uuid_1 = require("uuid");
var Firestore_1 = require("../services/Firestore");
var WebSocket_1 = require("../services/WebSocket");
var FeedItem_1 = require("../types/FeedItem");
var FirestoreCollections_1 = __importDefault(require("../types/FirestoreCollections"));
var TeamsUtils_1 = require("./TeamsUtils");
var MEETING_DOES_NOT_EXIST = new Error("Meeting dosen't exist");
var onGoingMeetings = new Map();
var meetingIsStarted = function (meetingID) {
    return onGoingMeetings.has(meetingID);
};
exports.meetingIsStarted = meetingIsStarted;
var startMeeting = function (meetingID) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _b = (_a = onGoingMeetings).set;
                _c = [meetingID];
                return [4 /*yield*/, (0, exports.getMeetingByID)(meetingID)];
            case 1:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [2 /*return*/];
        }
    });
}); };
exports.startMeeting = startMeeting;
var joinMeeting = function (meetingID, userID) {
    var meeting = onGoingMeetings.get(meetingID);
    if (meeting) {
        meeting.participants = meeting.participants || [];
        if (meeting.participants.includes(userID)) {
            throw new Error("User already in meeting");
        }
        meeting.participants.push(userID);
    }
    else {
        throw new Error("Meeting not started");
    }
};
exports.joinMeeting = joinMeeting;
var getMeetingByID = function (meetingID) { return __awaiter(void 0, void 0, void 0, function () {
    var meeting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Firestore_1.readData)(FirestoreCollections_1.default.MEETINGS, meetingID)];
            case 1:
                meeting = _a.sent();
                if (!meeting)
                    throw MEETING_DOES_NOT_EXIST;
                return [2 /*return*/, meeting];
        }
    });
}); };
exports.getMeetingByID = getMeetingByID;
var updateMeeting = function (meeting) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Firestore_1.addData)(FirestoreCollections_1.default.MEETINGS, meeting.meetingID, meeting)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.updateMeeting = updateMeeting;
var createMeeting = function (name, time, presenterID, teamID) { return __awaiter(void 0, void 0, void 0, function () {
    var meeting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                meeting = {
                    teamID: teamID,
                    presenterID: presenterID,
                    meetingID: (0, exports.generateMeetingID)(),
                    meetingName: name,
                    meetingTime: time,
                };
                return [4 /*yield*/, (0, TeamsUtils_1.addFeedItem)(teamID, { meetingID: meeting.meetingID, name: name, start: time }, FeedItem_1.FeedType.Meeting)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, Firestore_1.addData)(FirestoreCollections_1.default.MEETINGS, meeting.meetingID, meeting)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, TeamsUtils_1.addMeeting)(teamID, meeting.meetingID)];
            case 3:
                _a.sent();
                return [2 /*return*/, meeting];
        }
    });
}); };
exports.createMeeting = createMeeting;
var generateMeetingID = function () {
    return (0, uuid_1.v4)();
};
exports.generateMeetingID = generateMeetingID;
var startMeetingIfNotStarted = function (meetingID) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!(0, exports.meetingIsStarted)(meetingID)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.startMeeting)(meetingID)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.startMeetingIfNotStarted = startMeetingIfNotStarted;
var leaveMeeting = function (meetingID, userID) {
    var meeting = onGoingMeetings.get(meetingID);
    if (meeting) {
        meeting.participants = meeting.participants || [];
        var index = meeting.participants.indexOf(userID);
        if (index > -1) {
            meeting.participants.splice(index, 1);
            if (meeting.participants.length === 0) {
                onGoingMeetings.delete(meetingID);
                (0, WebSocket_1.deleteRoom)(meetingID);
            }
        }
    }
    else {
        throw new Error("Meeting not started");
    }
};
exports.leaveMeeting = leaveMeeting;
var getMeetingParticipants = function (meetingID) {
    var meeting = onGoingMeetings.get(meetingID);
    if (meeting) {
        return meeting.participants || [];
    }
    else {
        throw new Error("Meeting not started");
    }
};
exports.getMeetingParticipants = getMeetingParticipants;
