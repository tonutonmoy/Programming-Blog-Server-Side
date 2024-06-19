"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    jwt: {
        secret: process.env.JWT_SIGN,
        expires: process.env.JWT_EXPIRES,
    },
};
