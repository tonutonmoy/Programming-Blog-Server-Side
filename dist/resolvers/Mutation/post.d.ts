export declare const postResolvers: {
    addPost: (parent: any, { post }: any, { prisma, userInfo }: any) => Promise<{
        userError: string;
        result: any;
    } | {
        userError: any;
        result: any;
    }>;
    updatePost: (parent: any, args: any, { prisma, userInfo }: any) => Promise<{
        userError: string;
        result: any;
    }>;
    deletePost: (parent: any, args: any, { prisma, userInfo }: any) => Promise<{
        userError: string;
        result: any;
    }>;
    publishPost: (parent: any, args: any, { prisma, userInfo }: any) => Promise<{
        userError: string;
        result: any;
    }>;
};
//# sourceMappingURL=post.d.ts.map