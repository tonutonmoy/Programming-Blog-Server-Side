"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const auth_1 = require("./auth");
const post_1 = require("./post");
const profile_1 = require("./profile");
const user_1 = require("./user");
exports.Mutation = Object.assign(Object.assign(Object.assign(Object.assign({}, auth_1.authResolvers), post_1.postResolvers), profile_1.profileResolvers), user_1.userResolvers);
