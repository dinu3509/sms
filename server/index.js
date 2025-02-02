const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dashBoardModel = require("./models/dashboard");
const studentModel = require("./models/Student");
const sprofile = require("./models/Sprofile");
const csModel = require("./models/courseStructure");

const app = express();
app.use(express.json());
app.use(cors());

// Use Environment Variables for MongoDB URI
const mongoURI = process.env.MONGO_URI || "mongodb+srv://dinu3509:diNesh%4005@cluster0.duykm.mongodb.net/dinesh";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.post("/login", async (req, res) => {
  const { uid, password } = req.body;
  try {
    const user = await studentModel.findOne({ uid });
    if (user) {
      return res.json({ message: user.password === password ? "Success" : "Password Incorrect" });
    }
    res.status(404).json({ message: "No record Existed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/home", async (req, res) => {
  const { uid, section } = req.body;
  try {
    if (section === "profile") {
      const user = await sprofile.findOne({ uid });
      return user ? res.json({ message: "UID received", user }) : res.status(404).json({ message: "No user found" });
    }
    if (section === "dashboard") {
      const user = await dashBoardModel.findOne({ uid });
      if (!user) return res.status(404).json({ message: "No user found" });

      const user2 = await csModel.findOne({ uid });
      return user2 ? res.json({ message: "UID received", user, user2 }) : res.status(404).json({ message: "No user2 found" });
    }
    res.status(400).json({ message: "Invalid section" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vercel does not support app.listen(), so export the app
module.exports = app;
