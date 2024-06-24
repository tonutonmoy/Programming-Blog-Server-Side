"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserAccess = void 0;
const checkUserAccess = async (prisma, userId, postId, Boolean) => {
    const user = await prisma.user.findUnique({
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
        const post = await prisma.post.findUnique({
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
};
exports.checkUserAccess = checkUserAccess;
