import monogoose from "mongoose";
const Schema = monogoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      filename: String,
    },
    author: {
      type: monogoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = monogoose.model("Post", PostSchema);

export default Post;
