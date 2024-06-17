import { checkUserAccess } from "../../utils/checkUserAccess";

export const userResolvers = {
  updateUserRole: async (parent: any, args: any, { prisma, userInfo }: any) => {
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
      const result = await prisma.user.update({
        where: {
          id: args.userId,
        },
        data: { role: args.userRole },
      });

      return {
        userError: null,
        result: result,
      };
    } catch (e) {
      console.error(e);
      return {
        userError: "Failed to update usr Role",
        result: null,
      };
    }
  },
};
