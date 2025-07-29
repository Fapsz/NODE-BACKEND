import Post from "../Model/Post.js";
import bcrypt from "bcryptjs";

let createPost = async (req, res) => {
  try {
    let { title, snippet, content } = req.body;

    if (!title || !snippet || !content) {
      res.status(400).json({ message: "All fields are required" });
    }

    const image = {
      url: req.file?.path,
      filename: req.file?.filename,
    };

    // let hashedpassword = await bcrypt.hash( password,10);

    const newPost = await Post.create({
      title,
      snippet,
      content,
      image,
      author: req.user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }

  res.status(200).json({
    message: "Post registered successfully",
  });
};

const getAllPosts = async (req, res) => {
  const myPosts = await Post.find.populate({
    path: "author",
    select: "fullname",
  })

  if (!myPosts) {
    return res.status(404).json({
      message: "No post found",
    });
  }
  res.status(200).json(myPosts);
};

const get1post = async (req, res) => {
  let { id } = req.params;

  const onePost = await Post.findById(id).populate({
    path: "author",
    select: "firstname lastname",
  });
  if (!onePost) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  res.status(200).send(onePost);
};

const del1post = async (req, res) => {
  let { id } = req.params;

  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  res.status(200).json({
    message: "Post deleted successfully",
  });
};

const update1post = async (req, res) => {
  let { id } = req.params;
  let newData = req.body;

  const updatedPost = await Post.findByIdAndUpdate(id, newData, { new: true });

  if (!updatedPost) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  res.status(200).json({
    message: "Post updated successfully",
    updatedPost,
  });
};

export { getAllPosts, get1post, del1post, update1post, createPost };
