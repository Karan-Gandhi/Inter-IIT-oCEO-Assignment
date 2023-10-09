import Meeting from "../types/Meeting";
export declare const meetingIsStarted: (meetingID: MeetingID) => boolean;
export declare const startMeeting: (meetingID: MeetingID) => Promise<void>;
export declare const joinMeeting: (meetingID: MeetingID, userID: UserID) => void;
export declare const getMeetingByID: (meetingID: MeetingID) => Promise<Meeting>;
export declare const updateMeeting: (meeting: Meeting) => Promise<FirebaseFirestore.WriteResult>;
export declare const createMeeting: (name: string, time: number, presenterID: UserID, teamID: TeamID) => Promise<Meeting>;
export declare const generateMeetingID: () => MeetingID;
export declare const startMeetingIfNotStarted: (meetingID: MeetingID) => Promise<void>;
export declare const leaveMeeting: (meetingID: MeetingID, userID: UserID) => void;
export declare const getMeetingParticipants: (meetingID: MeetingID) => any;
//# sourceMappingURL=MeetingUtils.d.ts.map