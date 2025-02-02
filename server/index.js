const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dashBoardModel = require("./models/dashboard");
const studentModel = require("./models/Student");
const sprofile = require("./models/Sprofile");
const csModel = require("./models/courseStructure");

const app = express();
const allowedOrigins = ['https://school-1rzs.vercel.app'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request if the origin matches
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);

mongoose.connect(
  "mongodb+srv://dinu3509:diNesh%400@cluster0.duykm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
/**mongodb+srv://dinu3509:diNesh%400@cluster0.duykm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 */
app.get("/", (req, res) => {
  res.json("Hi Dinesh Reddy");
});

app.post("/login", (req, res) => {
  const { uid, password } = req.body;
  studentModel.findOne({ uid: uid }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ message: "Success" });
      } else {
        res.json({ message: "Password Incorrect" });
      }
    } else {
      res.json("No record Existed");
    }
  });
});

app.post("/home", (req, res) => {
  const { uid, section } = req.body;

  if (section === "profile") {
    sprofile
      .findOne({ uid: uid })
      .then((user) => {
        if (user) {
          res.json({ message: "UID received", user });
        } else {
          res
            .status(404)
            .json({ message: "No user found with the provided UID" });
        }
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      });
  } else if (section === "dashboard") {
    // Query to find user in dashBoardModel
    dashBoardModel
      .findOne({ uid: uid })
      .then((user) => {
        if (user) {
          // If user is found, query the second model (csModel)
          csModel
            .findOne({ uid: uid })
            .then((user2) => {
              if (user2) {
                // Both user and user2 found, send both in the response
                res.json({ message: "UID received", user, user2 });
              } else {
                // If user2 is not found
                res
                  .status(404)
                  .json({ message: "No user2 found with the provided UID" });
              }
            })
            .catch((err) => {
              // If there is an error in finding user2
              console.error(err);
              res
                .status(500)
                .json({ message: "Internal Server Error", error: err.message });
            });
        } else {
          // If user is not found
          res
            .status(404)
            .json({ message: "No user found with the provided UID" });
        }
      })
      .catch((err) => {
        // If there is an error in finding user
        console.error(err);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      });
  } else {
    // If section is not "dashboard", you can handle other cases here or send a default response

    res.status(400).json({ message: "Invalid section" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
