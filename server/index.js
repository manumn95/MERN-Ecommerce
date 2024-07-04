const express = require("express");
const connectDb = require( './config/db')
const cors = require("cors");
require("dotenv").config();
const router = require('./routes/index')

const app = express();
app.use(cors());
app.use(express.json())
app.use('/api',router);

const port = 8000 || process.env.PORT;

connectDb().then(()=>{
  app.listen(port, () => {
    console.log("connceted to DB")
    console.log("Server is running");
  });
})

