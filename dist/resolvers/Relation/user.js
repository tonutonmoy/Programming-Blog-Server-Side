"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.User = {
    profile: async (parent, args, { prisma, userInfo }) => {
        return await prisma.profile.findUnique({
            where: {
                userId: parent.id,
            },
        });
    },
};
