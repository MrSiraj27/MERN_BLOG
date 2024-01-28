const express = require("express");
const cors = require("cors");
const connectionDb = require("./db/conn");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.get("/",(req,res)=>{
  res.send("helo world");
}
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

connectionDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT);
