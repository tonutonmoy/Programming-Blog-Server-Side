import { Secret } from "jsonwebtoken";
export declare const jwtHelper: {
    generateToken: (payload: {
        userId: number;
    }, secret: Secret, expires: string) => Promise<string>;
    getUserInfoFromToken: (token: string) => Promise<{
        userId: number;
    }>;
};
//# sourceMappingURL=jwtHelper.d.ts.map