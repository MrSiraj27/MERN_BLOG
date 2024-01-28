const userModel = require("../models/userModel");
const userSchema = require("../models/userModel");
const blogModel = require("../models/blogModel");
const commentModel = require("../models/commentModel");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

exports.getAllUser = (req, res) => {
  res.send("Hello Siraj");
};

exports.regsiterUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    if (!name || !email || !password || !image) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already registered with this email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userSchema({ name, email, password: hashPassword, image });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error, "user not created");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "email is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid Details",
      });
    }

    return res.status(200).send({
      msg: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log(error, "not login in");
  }
};

exports.SingleUser = async (req, res) => {
  try {
    const id = req.params.id;

    const SingleUser = await userModel.findById(id).populate("blogs");
    if (!SingleUser) {
      return res.status(500).send({
        message: "No user found",
      });
    }
    return res.status(200).send({
      message: "User Found successfully",
      SingleUser,
    });
  } catch (error) {
    console.log(error, "error in single user");
  }
};

exports.postComment = async (req, res) => {
  try {
    const { comment, comments, image } = req.body;
    if ((!comment, !comments, !image)) {
      return res.status(500).send({
        message: "No comment found",
      });
    }
    console.log(comments);
    const find_blog = await blogModel.findById(comments);
    if (!find_blog) {
      return res.status(500).send({
        message: "no blog found with this id",
      });
    } else {
      console.log("blog found", find_blog);
    }

    // Check if find_blog.comments is defined and is an array
    // if (!find_blog.comments || !Array.isArray(find_blog.comments)) {
    //   find_blog.comments = []; // Initialize it as an empty array
    // }

    const createdComm = new commentModel({ comment, comments, image });
    // const session = await mongoose.startSession();
    // session.startTransaction();
    // await createdComm.save({ session });
    // find_blog.comments.push(createdComm);
    // await find_blog.save({ session });
    // await session.commitTransaction();
    const saveComm = await createdComm.save();

    if (saveComm) {
      return res.status(200).send({
        msg: "comment Created",
        saveComm,
      });
    } else {
      return res.status(500).send({
        msg: "comment not Created",
      });
    }
  } catch (error) {
    console.log(error, "in single blog");
  }
};

exports.getComments = async (req, res) => {
  try {
    const getComms = await commentModel.find({});
    if (getComms) {
      return res.status(200).send({
        message: "Commenst found",
        getComms,
      });
    }
    return res.status(500).send({
      message: "Not found comments",
    });
  } catch (error) {
    console.log(error);
  }
};
