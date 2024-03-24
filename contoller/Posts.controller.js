import prisma from "../prisma/schema.js";

const handleError = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
      return handleError(res, 400, "Please provide all fields");
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return handleError(res, 404, "User not found");
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: userId } },
      },
    });

    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    return handleError(res, 500, "Internal server error");
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });
    return res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return handleError(res, 500, "Internal server error");
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });

    if (!post) {
      return handleError(res, 404, "Post not found");
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return handleError(res, 500, "Internal server error");
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, userId } = req.body;

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content, userId: parseInt(userId) },
    });

    if (!post) {
      return handleError(res, 404, "Post not found");
    }

    return res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    return handleError(res, 500, "Internal server error");
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return handleError(res, 404, "Post not found");
    }

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return handleError(res, 500, "Internal server error");
  }
};
