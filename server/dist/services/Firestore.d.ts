export declare const addData: <T extends FirebaseFirestore.DocumentData>(collection: string, document: string, data: T) => Promise<FirebaseFirestore.WriteResult>;
export declare const readData: {
    <T>(collection: string): Promise<T[]>;
    <T>(collection: string, document: string): Promise<T>;
};
export declare const readDataNoCache: {
    <T>(collection: string): Promise<T[]>;
    <T>(collection: string, document: string): Promise<T>;
};
export declare const deleteData: (collection: string, document?: string) => Promise<unknown>;
export declare const readDataWhere: <T>(collection: string, fieldPath: string, opStr: FirebaseFirestore.WhereFilterOp, value: any) => Promise<T[]>;
export declare const getSnapshotWhere: (collection: string, fieldPath: string, opStr: FirebaseFirestore.WhereFilterOp, value: any) => FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
//# sourceMappingURL=Firestore.d.ts.map