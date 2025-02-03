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
    "mongodb+srv://dinu3509:diNesh%4005cluster0.duykm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.json("Hi Dinesh Reddy");
});

app.post("/", async (req, res) => {
  try {
    const { uid, password } = req.body;

    console.log("Received UID:", uid);
    console.log("Received Password:", password); // 🔴 Debugging Only

    // Fetch user from MongoDB
    const user = await studentModel.findOne({ uid });

    if (!user) {
      console.log("User not found for UID:", uid);
      return res.status(404).json({ message: "No record existed" });
    }

    console.log("Stored Password in DB:", user.password); // 🔴 Debugging Only

    if (user.password === password) {
      console.log("✅ Password Matched!");
      return res.json({ message: "Success" });
    } else {
      console.log("❌ Password Incorrect!");
      return res.json({
        message: "Password Incorrect",
        storedPassword: user.password, // Password stored in DB
        receivedPassword: password, // Password received in the request
      });
    }
  } catch (err) {
    console.error("🚨 Error during login:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
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
