"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
exports.Profile = {
    user: async (parent, args, { prisma, userInfo }) => {
        return await prisma.user.findUnique({
            where: {
                id: parent.userId,
            },
        });
    },
};
