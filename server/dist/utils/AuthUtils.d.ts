export declare const loginWithEmailAndPassword: (email: string, password: string) => Promise<any>;
export declare const createUserWithEmailAndPassword: (name: string, email: string, password: string) => Promise<any>;
export declare const getAccessToken: (user: User) => AccessToken;
export declare const getRefreshToken: (user: User) => RefreshToken;
export declare const revokeRefreshToken: (token: RefreshToken) => void;
export declare const verifyAccessToken: (token: Token, callback: jwt.VerifyCallback) => void;
//# sourceMappingURL=AuthUtils.d.ts.map