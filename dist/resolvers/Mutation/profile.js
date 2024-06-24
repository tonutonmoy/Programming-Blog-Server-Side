"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileResolvers = void 0;
const checkUserAccess_1 = require("../../utils/checkUserAccess");
exports.profileResolvers = {
    updateProfile: async (parent, args, { prisma, userInfo }) => {
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
        try {
            const [user, profile] = await prisma.$transaction([
                prisma.user.update({
                    where: {
                        id: userInfo.userId,
                    },
                    data: args.user,
                }),
                prisma.profile.update({
                    where: {
                        userId: userInfo.userId,
                    },
                    data: args.profile,
                }),
            ]);
            return {
                userError: null,
                result: { user, profile },
            };
        }
        catch (e) {
            console.error(e);
            return {
                userError: "Failed to update profile",
                result: null,
            };
        }
    },
};
