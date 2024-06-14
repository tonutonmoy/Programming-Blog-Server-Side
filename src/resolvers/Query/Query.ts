import { checkUserAccess } from "../../utils/checkUserAccess";

export const Query = {
  singleUser: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  // Profile
  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "unauthorized ",
        result: null,
      };
    }
    const error = await checkUserAccess(prisma, userInfo.userId);
    if (error) {
      return error;
    }
    const result = await prisma.profile.findUnique({
      where: {
        userId: userInfo.userId,
      },
    });

    return {
      userError: null,
      result: result,
    };
  },

  // get  All users
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },

  // Get all posts
  posts: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.post.findMany({
      where: {
        published: true,
        isDeleted: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },

  //  Get Single post for details blog
  singlePost: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.post.findUnique({
      where: {
        id: args.postId,
        published: true,
        isDeleted: true,
      },
    });
  },

  // get user post
  myPosts: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "unauthorized ",
        result: null,
      };
    }
    const error = await checkUserAccess(prisma, userInfo.userId);
    if (error) {
      return error;
    }
    const result = await prisma.post.findMany({
      where: {
        authorId: userInfo.userId,
        isDeleted: true,
      },
    });

    return {
      userError: null,
      result: result,
    };
  },
};
