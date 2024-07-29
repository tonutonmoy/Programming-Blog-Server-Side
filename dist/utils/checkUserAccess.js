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
exports.checkUserAccess = void 0;
const checkUserAccess = (prisma, userId, postId, Boolean) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return {
            userError: "User not found!",
            result: null,
        };
    }
    if (Boolean) {
        const post = yield prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!post) {
            return {
                userError: "post not found!",
                result: null,
            };
        }
        if (post.authorId !== user.id) {
            return {
                userError: "Post not owned by User!",
                result: null,
            };
        }
    }
});
exports.checkUserAccess = checkUserAccess;
