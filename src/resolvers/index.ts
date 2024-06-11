import { Mutation } from "./Mutation/Mutation";
import { Query } from "./Query/Query";
import { Profile } from "./Relation/profile";
import { User } from "./Relation/user";
import { Post } from "./post";

export const resolvers = {
  Query,
  Post,
  User,
  Profile,
  Mutation,
};
