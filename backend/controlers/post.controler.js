import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

const createpost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    // Check for required fields
    if ([title, content].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const imagelocalpath = req.files?.image?.[0]?.path;

    // Ensure image is provided
    if (!imagelocalpath) {
        throw new ApiError(400, "Image file is required");
    }

    console.log("Local image path:", imagelocalpath);
    console.log("User ID from token:", req.user.id);
    // Upload image to Cloudinary
    const image = await uploadOnCloudinary(imagelocalpath);
    if (!image) {
      console.log("Image upload to Cloudinary failed");
      throw new ApiError(400, "Image upload failed");
    }
    
  console.log(image);
  

    // if (!image) {
    //     throw new ApiError(400, "Image upload failed");
    // }
    

    // Create the post
    const post = await Blog.create({
        title,
        content,
        image: image.secure_url,
        author: req.user.id,
    });

    if (!post) {
        return res.status(400).json({ message: "Post not created" });
    }

    res.status(201).json({
        success: true,
        data: post,
    });
});

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Blog.find();

    if (!posts || posts.length === 0) {
        throw new ApiError(404, "No posts found");
    }

    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts,
    });
});

const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Blog.findById(id);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    res.status(200).json({
        success: true,
        data: post,
    });
});

const deletePost = asyncHandler(async (req,res) => {
   const {id} = req.params;
    const deletepost = await Blog.findByIdAndDelete(id)
    if(!deletepost) {
        throw new ApiError(404, "Post not deleted");
    }
    res.status(200).json({
        success:true
    })
})

const updatePost = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { title, content } = req.body;

    console.log("Request Params:", req.params); 
    console.log("Request User:", req.user.id);  // Log req.user for debugging
    

    // Find the post by ID
    const post = await Blog.findById(id);

    // Check if the post exists
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== req.user.id) {
        throw new ApiError(403, "You are not authorized to edit this post");
    }

    // Update title and content if provided
    post.title = title || post.title;
    post.content = content || post.content;

    // Check if a new image is provided
    const imagelocalpath = req.files?.image?.[0]?.path;
    if (imagelocalpath) {
        // Upload new image to Cloudinary
        const image = await uploadOnCloudinary(imagelocalpath);

        if (!image) {
            throw new ApiError(400, "Image upload failed");
        }

        // Update the post's image
        post.image = image.secure_url;
    }

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json({
        success: true,
        data: updatedPost,
    });
});


export { createpost, getAllPosts, getPostById, updatePost,deletePost };
