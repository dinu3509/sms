const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dashBoardModel = require("./models/dashboard");
const studentModel = require("./models/Student");
const sprofile = require("./models/Sprofile");
const csModel = require("./models/courseStructure");

const app = express();
const allowedOrigins = ["https://school-1rzs.vercel.app"];

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        // Allow requests from your frontend
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add any custom headers your frontend uses
    credentials: true, // Allow cookies if needed
  })
);

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://dinu3509:diNesh%400@cluster0.duykm.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.json("Hi Dinesh Reddy");
});

app.post("/", (req, res) => {
  try {
    const { uid, password } = req.body;
    const user = studentModel.findOne({ uid });
    if (!user) return res.status(404).json({ message: "No record existed" });
    res.json({
      message: user.password === password ? "Success" : "Password Incorrect",
    });
  } catch (err) {
    console.error("Error during login:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error 1", error: err.message });
  }
});

app.post("/home", (req, res) => {
  try {
    const { uid, section } = req.body;
    if (section === "profile") {
      const user = sprofile.findOne({ uid });
      return user
        ? res.json({ message: "UID received", user })
        : res.status(404).json({ message: "No user found" });
    }
    if (section === "dashboard") {
      const user = dashBoardModel.findOne({ uid });
      if (!user) return res.status(404).json({ message: "No user found" });
      const user2 = csModel.findOne({ uid });
      return user2
        ? res.json({ message: "UID received", user, user2 })
        : res.status(404).json({ message: "No user2 found" });
    }
    res.status(400).json({ message: "Invalid section" });
  } catch (err) {
    console.error("Error during home section fetch:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error 2", error: err.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
