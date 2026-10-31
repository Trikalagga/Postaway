import Post from "../models/post.model.js";

export const createPost = async (req, res)=> {

    const userId = req.userId;
    const message = req.body.message;

    if (!message || !message.trim()) {
        return res.status(400).json({
            message: "Post message cannot be empty."
        });
    }

    const post = await Post.create({
      user: userId,
      message: message,
    });

    const posts = await Post.findById(post._id).populate("user", "name");

    res.status(201).json({
        message: "Post created successfully",
        posts
    });
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "name");

  res.status(200).json({
    posts,
  });
};

export const getMyPosts = async (req, res) => {
  const userId = req.userId;

  const posts = await Post.find({ user: userId });

  res.status(200).json({
    posts,
  });
};




export const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
        post
    });
};

export const deletePost = async (req, res) => {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    if (post.user.toString() !== userId) {
        return res.status(403).json({
            message: "You can only delete yourn own posts"
        });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
        message: "Post deleted successfully"
    });
};

