const express = require("express");
const connectDb = require( './config/db')
const cookieParser = require('cookie-parser')
const cors = require("cors");
require("dotenv").config();
const router = require('./routes/index')

const app = express();
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}));
app.use(express.json())
app.use(cookieParser())
app.use('/api',router);


const port = 8000 || process.env.PORT;

connectDb().then(()=>{
  app.listen(port, () => {
    console.log("connceted to DB")
    console.log("Server is running");
  });
})

