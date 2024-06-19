"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolvers = void 0;
const checkUserAccess_1 = require("../../utils/checkUserAccess");
exports.postResolvers = {
    addPost: (parent_1, _a, _b) => __awaiter(void 0, [parent_1, _a, _b], void 0, function* (parent, { post }, { prisma, userInfo }) {
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                result: null,
            };
        }
        const newPost = yield prisma.post.create({
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
    }),
    updatePost: (parent_2, args_1, _c) => __awaiter(void 0, [parent_2, args_1, _c], void 0, function* (parent, args, { prisma, userInfo }) {
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                result: null,
            };
        }
        const error = yield (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId, args.postId, true);
        if (error) {
            return error;
        }
        const updatedPost = yield prisma.post.update({
            where: {
                id: args.postId,
            },
            data: args.post,
        });
        return {
            userError: null,
            result: updatedPost,
        };
    }),
    deletePost: (parent_3, args_2, _d) => __awaiter(void 0, [parent_3, args_2, _d], void 0, function* (parent, args, { prisma, userInfo }) {
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                result: null,
            };
        }
        const error = yield (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const deletedPost = yield prisma.post.update({
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
    }),
    publishPost: (parent_4, args_3, _e) => __awaiter(void 0, [parent_4, args_3, _e], void 0, function* (parent, args, { prisma, userInfo }) {
        console.log(args);
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                result: null,
            };
        }
        const error = yield (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const updatedPost = yield prisma.post.update({
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
    }),
};
