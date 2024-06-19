"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Mutation_1 = require("./Mutation/Mutation");
const Query_1 = require("./Query/Query");
const profile_1 = require("./Relation/profile");
const user_1 = require("./Relation/user");
const post_1 = require("./post");
exports.resolvers = {
    Query: Query_1.Query,
    Post: post_1.Post,
    User: user_1.User,
    Profile: profile_1.Profile,
    Mutation: Mutation_1.Mutation,
};
