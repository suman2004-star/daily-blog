import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { createpost, getAllPosts, getPostById, updatePost,deletePost } from "../controlers/post.controler.js";

const router = Router();

// Route to create a post
router.route("/post").post(
    auth,
    upload.fields([{ name: "image", maxCount: 1 }]),
    createpost
);

// Route to get all posts
router.route("/posts").get(getAllPosts);
router.route("/delete/:id").delete(deletePost);

// Route to get a single post by ID
router.route("/posts/:id").get(getPostById);

// Route to update a post by ID (only author can update)
router.route("/updatePost/:id").put(
    auth,
    upload.fields([{ name: "image", maxCount: 1 }]),
    updatePost
);

export default router;
