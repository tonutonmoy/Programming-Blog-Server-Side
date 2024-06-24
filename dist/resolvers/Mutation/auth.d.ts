interface userInfo {
    name: string;
    email: string;
    password: string;
    image: string;
}
export declare const authResolvers: {
    registration: (parent: any, args: userInfo, { prisma }: any) => Promise<{
        userError: string;
        token: any;
    } | {
        userError: any;
        token: string;
    }>;
    login: (parent: any, args: any, { prisma }: any) => Promise<{
        userError: string;
        token: any;
    } | {
        userError: any;
        token: string;
    }>;
};
export {};
//# sourceMappingURL=auth.d.ts.map