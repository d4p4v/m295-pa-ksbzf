const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The topic must have a name"],
  },
  assignee: {
    type: ObjectId,
    required: [true, "The topic must have an assignee"],
  },
  students: {
    type: Array,
    default: [],
  },
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
