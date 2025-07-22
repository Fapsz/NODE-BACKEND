import mongoose from "mongoose";
// import authorize from "../middlewares/authorize";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Post",
    },
  },
  { timetamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
