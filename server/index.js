const express = require("express");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/index");

const app = express();



app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}))

app.use(express.json({ limit: '50mb' }));  
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use("/api", router);

const port = process.env.PORT || 8000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log("Connected to DB");
    console.log("Server is running on port", port);
  });
});
