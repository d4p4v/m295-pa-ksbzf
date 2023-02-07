const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const postSchema = new mongoose.Schema({
  topic: {
    type: ObjectId,
    required: [true, "A post must belong to a topic"],
  },
  author: {
    type: ObjectId,
    required: [true, "A post must have an author"],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
