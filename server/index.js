const express = require("express");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/index");

const app = express();

const allowedOrigin = 'https://mern-ecommerce-frontend-amber.vercel.app';

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(`Received origin: ${origin}`);  // Logging the received origin
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const port = process.env.PORT || 8000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log("Connected to DB");
    console.log("Server is running on port", port);
  });
});
