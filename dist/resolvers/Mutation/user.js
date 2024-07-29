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
exports.userResolvers = void 0;
const checkUserAccess_1 = require("../../utils/checkUserAccess");
exports.userResolvers = {
    updateUserRole: (parent_1, args_1, _a) => __awaiter(void 0, [parent_1, args_1, _a], void 0, function* (parent, args, { prisma, userInfo }) {
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
        try {
            const result = yield prisma.user.update({
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
    }),
};
