const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  versionKey: false,
  transform: (doc, obj) => {
    const { _id, ...rest } = obj;
    return { id: _id.toString(), ...rest };
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
