const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log("Error in Db conncection");
  }
}

module.exports = connectDb;
