const express = require("express");
const {
  getAllUser,
  regsiterUser,
  loginUser,
  SingleUser,
  postComment,
  getComments,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", getAllUser);
router.post("/register", regsiterUser);
router.post("/login", loginUser);
router.get("/single-user/:id", SingleUser);
//posting comments
router.post("/post-comment", postComment);
router.get("/get-comment", getComments);

module.exports = router;
