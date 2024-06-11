export const User = {
  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: parent.id,
      },
    });
  },
};
