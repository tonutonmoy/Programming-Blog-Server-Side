"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
exports.Post = {
    author: async (parent, args, { prisma, userInfo }) => {
        return await prisma.user.findUnique({
            where: {
                id: parent.authorId,
            },
        });
    },
};
