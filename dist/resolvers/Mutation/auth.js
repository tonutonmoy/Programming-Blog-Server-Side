"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolvers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const jwtHelper_1 = require("../../utils/jwtHelper");
exports.authResolvers = {
    registration: async (parent, args, { prisma }) => {
        const isExist = await prisma.user.findFirst({
            where: {
                email: args.email,
            },
        });
        console.log(isExist);
        if (isExist) {
            return {
                userError: "Already this email is registered!",
                token: null,
            };
        }
        const hashedPassword = await bcrypt_1.default.hash(args.password, 12);
        const newUser = await prisma.user.create({
            data: {
                name: args.name,
                email: args.email,
                password: hashedPassword,
            },
        });
        if (newUser) {
            await prisma.profile.create({
                data: {
                    userId: newUser.id,
                    image: args.image,
                },
            });
        }
        const token = await jwtHelper_1.jwtHelper.generateToken({ userId: newUser.id }, config_1.default.jwt.secret, config_1.default.jwt.expires);
        return {
            userError: null,
            token,
        };
    },
    login: async (parent, args, { prisma }) => {
        const user = await prisma.user.findFirst({
            where: {
                email: args.email,
            },
        });
        if (!user) {
            return {
                userError: "User not found!",
                token: null,
            };
        }
        const correctPass = await bcrypt_1.default.compare(args.password, user.password);
        if (!correctPass) {
            return {
                userError: "Incorrect Password!",
                token: null,
            };
        }
        const token = await jwtHelper_1.jwtHelper.generateToken({ userId: user.id }, config_1.default.jwt.secret, config_1.default.jwt.expires);
        return {
            userError: null,
            token,
        };
    },
};
