const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { getAllBrands } = require("./src/controller/brandController");
const app = express();

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

const Router = require("./src/routes");

Router(app);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
  });
});
