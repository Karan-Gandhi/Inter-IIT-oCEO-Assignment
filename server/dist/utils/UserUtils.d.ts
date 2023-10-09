export declare const getUserByID: (userID: UserID) => Promise<User>;
export declare const updateUserData: (userID: UserID, userData: User) => Promise<FirebaseFirestore.WriteResult>;
export declare const userJoinTeam: (teamID: TeamID, userID: UserID) => Promise<FirebaseFirestore.WriteResult>;
export declare const getUserTeams: (userID: UserID) => Promise<any>;
export declare const searchUserByEmail: (email: string, searchSize: number, ignoreEmail: string) => Promise<User[]>;
export declare const removeUserFromTeam: (userID: UserID, teamID: TeamID) => Promise<any>;
//# sourceMappingURL=UserUtils.d.ts.map