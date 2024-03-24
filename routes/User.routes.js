import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../contoller/User.contoller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/create", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;