import Comment from "../Model/Comment.js";
import Post from "../Model/Post.js";

let addcomments = async (req, res) => {
  let { comment } = req.body;
  let { postId } = req.params;

  if (!comment) {
    return res.status(404).json({ message: "no post found" });
  }
  try {
    const newComment = await Comment.create({
      comment,
      post: postId,
      author: req.user.id,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllcomments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const get1comment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update1comment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (comment) {
    return res.status(400).json({ message: "No fields to update" });
  }
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      newData,
      { comment },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const del1Comment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllcomments,
  addcomments,
  get1comment,
  update1comment,
  del1Comment,
};
