const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: [true, "comment is required"],
  },
  comments: {
    type: String,
    requied: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const commentModel = mongoose.model("COMMENT", commentSchema);
module.exports = commentModel;
