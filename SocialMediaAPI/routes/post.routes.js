import express from "express";
import { createPost, getPosts, getMyPosts, getPostById, deletePost } from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);
router.get("/mine", authMiddleware, getMyPosts);
router.get("/:id", authMiddleware, getPostById); 
router.delete("/:id", authMiddleware, deletePost);

export default router;


