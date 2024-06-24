"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const checkUserAccess_1 = require("../../utils/checkUserAccess");
exports.Query = {
    singleUser: async (parent, args, { prisma, userInfo }) => {
        return await prisma.user.findUnique({
            where: {
                id: userInfo.userId,
            },
        });
    },
    // Profile
    profile: async (parent, args, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userError: "unauthorized ",
                result: null,
            };
        }
        const error = await (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const result = await prisma.profile.findUnique({
            where: {
                userId: userInfo.userId,
            },
        });
        return {
            userError: null,
            result: result,
        };
    },
    // get  All users
    users: async (parent, args, { prisma }) => {
        return await prisma.user.findMany();
    },
    // Get all posts
    posts: async (parent, args, { prisma }) => {
        return await prisma.post.findMany({
            where: {
                published: true,
                isDeleted: true,
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
            ],
        });
    },
    //  Get Single post for details blog
    singlePost: async (parent, args, { prisma }) => {
        return await prisma.post.findUnique({
            where: {
                id: args.postId,
                isDeleted: true,
            },
        });
    },
    // get user post
    myPosts: async (parent, args, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userError: "unauthorized ",
                result: null,
            };
        }
        const error = await (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const result = await prisma.post.findMany({
            where: {
                authorId: userInfo.userId,
                isDeleted: true,
            },
        });
        return {
            userError: null,
            result: result,
        };
    },
    // get requested  post
    requestedPosts: async (parent, args, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userError: "unauthorized ",
                result: null,
            };
        }
        const error = await (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const result = await prisma.post.findMany({
            where: {
                isDeleted: true,
                published: false,
            },
        });
        return {
            userError: null,
            result: result,
        };
    },
};
