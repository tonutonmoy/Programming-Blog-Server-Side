import { checkUserAccess } from "../../utils/checkUserAccess";

export const profileResolvers = {
  updateProfile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        result: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId);
    if (error) {
      return error;
    }

    try {
      const [user, profile] = await prisma.$transaction([
        prisma.user.update({
          where: {
            id: userInfo.userId,
          },
          data: args.user,
        }),
        prisma.profile.update({
          where: {
            userId: userInfo.userId,
          },
          data: args.profile,
        }),
      ]);

      return {
        userError: null,
        result: { user, profile },
      };
    } catch (e) {
      console.error(e);
      return {
        userError: "Failed to update profile",
        result: null,
      };
    }
  },
};
