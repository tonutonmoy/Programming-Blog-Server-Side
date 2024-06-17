import { authResolvers } from "./auth";
import { postResolvers } from "./post";
import { profileResolvers } from "./profile";
import { userResolvers } from "./user";

export const Mutation = {
  ...authResolvers,
  ...postResolvers,
  ...profileResolvers,
  ...userResolvers,
};
