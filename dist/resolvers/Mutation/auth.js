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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolvers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const jwtHelper_1 = require("../../utils/jwtHelper");
exports.authResolvers = {
    registration: (parent_1, args_1, _a) => __awaiter(void 0, [parent_1, args_1, _a], void 0, function* (parent, args, { prisma }) {
        const isExist = yield prisma.user.findFirst({
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
        const hashedPassword = yield bcrypt_1.default.hash(args.password, 12);
        const newUser = yield prisma.user.create({
            data: {
                name: args.name,
                email: args.email,
                password: hashedPassword,
            },
        });
        if (newUser) {
            yield prisma.profile.create({
                data: {
                    userId: newUser.id,
                    image: args.image,
                },
            });
        }
        const token = yield jwtHelper_1.jwtHelper.generateToken({ userId: newUser.id }, config_1.default.jwt.secret, config_1.default.jwt.expires);
        return {
            userError: null,
            token,
        };
    }),
    login: (parent_2, args_2, _b) => __awaiter(void 0, [parent_2, args_2, _b], void 0, function* (parent, args, { prisma }) {
        const user = yield prisma.user.findFirst({
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
        const correctPass = yield bcrypt_1.default.compare(args.password, user.password);
        if (!correctPass) {
            return {
                userError: "Incorrect Password!",
                token: null,
            };
        }
        const token = yield jwtHelper_1.jwtHelper.generateToken({ userId: user.id }, config_1.default.jwt.secret, config_1.default.jwt.expires);
        return {
            userError: null,
            token,
        };
    }),
};
