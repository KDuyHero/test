const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors({ origin: process.env.FRONTEND_HOST, credentials: true }));

const PORT = process.env.PORT || 8080;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (error) {
    console.log("Connect to db fail");
  }
};

app.get("/", (req, res) => {
  res.json("hello world");
});

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

const Router = require("./src/routes");

Router(app);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
  });
});
