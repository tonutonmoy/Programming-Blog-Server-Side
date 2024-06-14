export const checkUserAccess = async (
  prisma: any,
  userId: any,
  postId?: any,
  Boolean?: boolean
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userError: "User not found!",
      result: null,
    };
  }

  if (Boolean) {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return {
        userError: "post not found!",
        result: null,
      };
    }

    if (post.authorId !== user.id) {
      return {
        userError: "Post not owned by User!",
        result: null,
      };
    }
  }
};
