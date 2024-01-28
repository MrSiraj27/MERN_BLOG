const mongoose = require("mongoose");

const mongod = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://businesskaro5:siraj@cluster0.fs4k1qp.mongodb.net/"
    );
    console.log("connection successfull");
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongod;
