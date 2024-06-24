"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolvers = void 0;
const checkUserAccess_1 = require("../../utils/checkUserAccess");
exports.postResolvers = {
    addPost: async (parent, { post }, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                result: null,
            };
        }
        const newPost = await prisma.post.create({
            data: {
                title: post.title,
                content: post.content,
                image: post.image,
                authorId: userInfo.userId,
            },
        });
        return {
            userError: null,
            result: newPost,
        };
    },
    updatePost: async (parent, args, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                result: null,
            };
        }
        const error = await (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId, args.postId, true);
        if (error) {
            return error;
        }
        const updatedPost = await prisma.post.update({
            where: {
                id: args.postId,
            },
            data: args.post,
        });
        return {
            userError: null,
            result: updatedPost,
        };
    },
    deletePost: async (parent, args, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                result: null,
            };
        }
        const error = await (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const deletedPost = await prisma.post.update({
            where: {
                id: args.postId,
            },
            data: {
                isDeleted: false,
            },
        });
        return {
            userError: null,
            result: deletedPost,
        };
    },
    publishPost: async (parent, args, { prisma, userInfo }) => {
        console.log(args);
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                result: null,
            };
        }
        const error = await (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const updatedPost = await prisma.post.update({
            where: {
                id: args.postId,
            },
            data: {
                published: true,
            },
        });
        return {
            userError: null,
            result: updatedPost,
        };
    },
};
