require("dotenv").config();
const express=require('express');
const app=express();
const path = require("path");
const mongoose = require("mongoose");
const foodRoutes = require("./routes/foodRoutes");
// const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cartRoutes = require("./routes/cartRoutes");
const dashboardRoutes = require("./routes/dashboardadminRoutes");



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", foodRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", cartRoutes);
app.use("/api", dashboardRoutes);







mongoose
  .connect("mongodb://127.0.0.1:27017/foodWebsite")
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(3000, () => {
      console.log("🚀 Server is listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });