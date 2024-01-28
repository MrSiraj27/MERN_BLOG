const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

exports.createBlog = async (req, res) => {
  try {
    const { title, desc, image, user } = req.body;
    if (!title || !desc || !image || !user) {
      return res.status(500).send({
        msg: "All Fields are required",
      });
    }

    const existingUser = await userModel.findById(user);

    if (!existingUser) {
      return res.status(404).send({
        msg: "No user found",
      });
    }

    const createdBlog = new blogModel({ title, desc, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdBlog.save({ session });
    existingUser.blogs.push(createdBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    const newBlog = await createdBlog.save();
    if (newBlog) {
      return res.status(200).send({
        msg: "Blog Created",
        newBlog,
      });
    } else {
      return res.status(500).send({
        msg: "Blog not Created",
      });
    }
  } catch (error) {
    console.log(error, "problem in creating blog");
  }
};

exports.allBlogs = async (req, res) => {
  const blog_per_page = 4;
  const page = req.query.page || 1;
  try {
    console.log(page);
    const skip = (page - 1) * blog_per_page;
    const count = await blogModel.estimatedDocumentCount({});
    const blogs = await blogModel
      .find({})
      .populate("user")
      .limit(blog_per_page)
      .skip(skip);

    const pageCount = count / blog_per_page;
    //console.log(pageCount);
    if (!blogs) {
      return res.status(500).send({
        message: "no blogs find",
      });
    }
    return res.status(200).send({
      blogs,
      msg: "blogs founded",
      success: true,
      pagination: {
        count,
        pageCount,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    // const id = req.params.id;
    const deletedBlog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    if (!deletedBlog) {
      return res.status(404).send({
        msg: "Blog Not Found",
      });
    }
    await deletedBlog.user.blogs.pull(deletedBlog);
    await deletedBlog.user.save();
    if (deletedBlog) {
      return res.status(200).send({
        msg: "Blog Deleted",
        deletedBlog,
      });
    } else {
      return res.status(200).send({
        msg: "Blog Not Deleted",
        deletedBlog,
      });
    }
  } catch (error) {
    console.log(error, "no delete");
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, desc, image } = req.body;
    if (!title || !desc || !image) {
      return res.status(500).send({
        message: "All fleilds are required",
      });
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (updatedBlog) {
      return res.status(200).send({
        message: "Blog Updated",
        updatedBlog,
      });
    } else {
      return {
        message: "Not updated",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.findBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogModel.findById(id);
    if (blog) {
      return res.status(200).send({
        message: "single blog found",
        blog,
      });
    } else {
      return res.status(500).send({
        message: "single blog not found",
        blog,
      });
    }
  } catch (error) {
    console.log(error, "error in finding single blog");
  }
};
