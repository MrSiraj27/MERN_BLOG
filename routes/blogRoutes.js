const express = require("express");
const {
  createBlog,
  allBlogs,
  deleteBlog,
  updateBlog,
  findBlog,
} = require("../controllers/blogControllers");
const router = express.Router();

router.post("/create-blog", createBlog);
router.get("/all-blogs", allBlogs);
router.delete("/delete-blog/:id", deleteBlog);
router.put("/update-blog/:id", updateBlog);
router.get("/find-blog/:id", findBlog);

module.exports = router;
