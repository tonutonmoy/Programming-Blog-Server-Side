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
exports.Query = void 0;
const checkUserAccess_1 = require("../../utils/checkUserAccess");
exports.Query = {
    singleUser: (parent_1, args_1, _a) => __awaiter(void 0, [parent_1, args_1, _a], void 0, function* (parent, args, { prisma, userInfo }) {
        return yield prisma.user.findUnique({
            where: {
                id: userInfo.userId,
            },
        });
    }),
    // Profile
    profile: (parent_2, args_2, _b) => __awaiter(void 0, [parent_2, args_2, _b], void 0, function* (parent, args, { prisma, userInfo }) {
        if (!userInfo) {
            return {
                userError: "unauthorized ",
                result: null,
            };
        }
        const error = yield (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const result = yield prisma.profile.findUnique({
            where: {
                userId: userInfo.userId,
            },
        });
        return {
            userError: null,
            result: result,
        };
    }),
    // get  All users
    users: (parent_3, args_3, _c) => __awaiter(void 0, [parent_3, args_3, _c], void 0, function* (parent, args, { prisma }) {
        return yield prisma.user.findMany();
    }),
    // Get all posts
    posts: (parent_4, args_4, _d) => __awaiter(void 0, [parent_4, args_4, _d], void 0, function* (parent, args, { prisma }) {
        return yield prisma.post.findMany({
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
    }),
    //  Get Single post for details blog
    singlePost: (parent_5, args_5, _e) => __awaiter(void 0, [parent_5, args_5, _e], void 0, function* (parent, args, { prisma }) {
        return yield prisma.post.findUnique({
            where: {
                id: args.postId,
                isDeleted: true,
            },
        });
    }),
    // get user post
    myPosts: (parent_6, args_6, _f) => __awaiter(void 0, [parent_6, args_6, _f], void 0, function* (parent, args, { prisma, userInfo }) {
        if (!userInfo) {
            return {
                userError: "unauthorized ",
                result: null,
            };
        }
        const error = yield (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const result = yield prisma.post.findMany({
            where: {
                authorId: userInfo.userId,
                isDeleted: true,
            },
        });
        return {
            userError: null,
            result: result,
        };
    }),
    // get requested  post
    requestedPosts: (parent_7, args_7, _g) => __awaiter(void 0, [parent_7, args_7, _g], void 0, function* (parent, args, { prisma, userInfo }) {
        if (!userInfo) {
            return {
                userError: "unauthorized ",
                result: null,
            };
        }
        const error = yield (0, checkUserAccess_1.checkUserAccess)(prisma, userInfo.userId);
        if (error) {
            return error;
        }
        const result = yield prisma.post.findMany({
            where: {
                isDeleted: true,
                published: false,
            },
        });
        return {
            userError: null,
            result: result,
        };
    }),
};
