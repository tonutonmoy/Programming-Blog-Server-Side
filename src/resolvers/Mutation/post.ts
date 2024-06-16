import { checkUserAccess } from "../../utils/checkUserAccess";

export const postResolvers = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        result: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        image: post.image,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      result: newPost,
    };
  },
  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        result: null,
      };
    }

    const error = await checkUserAccess(
      prisma,
      userInfo.userId,
      args.postId,
      true
    );
    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: args.postId,
      },
      data: args.post,
    });

    return {
      userError: null,
      result: updatedPost,
    };
  },
  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
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

    const deletedPost = await prisma.post.update({
      where: {
        id: args.postId,
      },
      data: {
        isDeleted: false,
      },
    });

    return {
      userError: null,
      result: deletedPost,
    };
  },
  publishPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(args);
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

    const updatedPost = await prisma.post.update({
      where: {
        id: args.postId,
      },
      data: {
        published: true,
      },
    });

    return {
      userError: null,
      result: updatedPost,
    };
  },
};
