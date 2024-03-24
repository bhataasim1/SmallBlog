import express from "express";
import { createPost, getPosts, getPostById, deletePost, updatePost } from "../contoller/Posts.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/create", createPost);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;