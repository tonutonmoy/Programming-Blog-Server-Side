export const Query = {
  singleUser: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: args.userId,
      },
    });
  },
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
  singlePost: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.post.findUnique({
      where: {
        id: args.postId,
        published: true,
      },
    });
  },
};
