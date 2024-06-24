export declare const Query: {
    singleUser: (parent: any, args: any, { prisma, userInfo }: any) => Promise<any>;
    profile: (parent: any, args: any, { prisma, userInfo }: any) => Promise<{
        userError: string;
        result: any;
    }>;
    users: (parent: any, args: any, { prisma }: any) => Promise<any>;
    posts: (parent: any, args: any, { prisma }: any) => Promise<any>;
    singlePost: (parent: any, args: any, { prisma }: any) => Promise<any>;
    myPosts: (parent: any, args: any, { prisma, userInfo }: any) => Promise<{
        userError: string;
        result: any;
    }>;
    requestedPosts: (parent: any, args: any, { prisma, userInfo }: any) => Promise<{
        userError: string;
        result: any;
    }>;
};
//# sourceMappingURL=Query.d.ts.map