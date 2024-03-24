import prisma from "../prisma/schema.js";

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    return res.status(200).json({ users });
  } catch (error) {
    // console.error("Error getting users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    // console.error("Error getting user by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, password } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        username,
        email,
        password,
      },
    });

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    // console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.post.deleteMany({
      where: {
        userId: parseInt(id),
      },
    });

    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
