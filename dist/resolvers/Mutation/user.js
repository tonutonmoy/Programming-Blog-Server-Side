"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const checkUserAccess_1 = require("../../utils/checkUserAccess");
exports.userResolvers = {
    updateUserRole: async (parent, args, { prisma, userInfo }) => {
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
            const result = await prisma.user.update({
                where: {
                    id: args.userId,
                },
                data: { role: args.userRole },
            });
            return {
                userError: null,
                result: result,
            };
        }
        catch (e) {
            console.error(e);
            return {
                userError: "Failed to update usr Role",
                result: null,
            };
        }
    },
};
