"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generateToken = async (payload, secret, expires) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expires });
    return token;
};
const getUserInfoFromToken = async (token) => {
    try {
        const userData = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        return userData;
    }
    catch (err) {
        return null;
    }
};
exports.jwtHelper = {
    generateToken,
    getUserInfoFromToken,
};
