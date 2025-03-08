const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");

const dashBoardModel = require("../models/dashboard");
const studentModel = require("../models/Student");
const sprofile = require("../models/Sprofile");
const csModel = require("../models/courseStructure");
const academicModel = require("../models/academic");
const facultyModel = require("../models/faculty");
const AddedProfile = require("../models/addProfile");
const Attendance = require("../models/attendance");

const subjects = require("../models/subj");
// Use AddedProfile here

const app = express();

app.use(cors()); // ✅ This enables CORS
const requiredFields = ["Campus"];
mongoose.connect(
  "mongodb+srv://dinu3509:diNesh%4005@cluster0.duykm.mongodb.net/dinesh?retryWrites=true&w=majority&appName=Cluster0"
);
// ✅ Middleware to parse JSON body
app.use(express.json());
// ✅ Root route
app.get("/", (req, res) => {
  res.json("Hi Dinesh Reddy");
});


app.post("/marks", async (req, res) => {
  const { uid, action, updatedMarks } = req.body;

  if (!uid) return res.status(400).json({ error: "UID is required" });

  try {
    let student = await academicModel.findOne({ uid });

    if (action === "fetch") {
      // Fetch marks
      if (!student) {
        return res.json({ message: "No marks found", semesters: [] });
      }
      return res.json({ message: "Marks fetched successfully", semesters: student.semesters });
    }

    if (action === "create") {
      // Create a new marksheet
      if (!student) {
        student = new academicModel({
          uid,
          semesters: [{ semester: 1, courses: [] }], // Start with one semester
        });
        await student.save();
        return res.json({ message: "New marksheet created", student });
      }
      return res.json({ message: "Marksheet already exists", student });
    }

    if (action === "update") {
      // Update marks
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      if (!Array.isArray(updatedMarks)) {
        return res.status(400).json({ error: "Invalid marks format" });
      }
      student.semesters = updatedMarks;
      await student.save();
      return res.json({ message: "Marks updated successfully", student });
    }

    res.status(400).json({ error: "Invalid action" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/updateAttendance", async (req, res) => {
  const { uid, date, option, attendance } = req.body;

  if (option === "Fetch") {
    try {
      const record = await Attendance.findOne({ uid, date });
      if (record) {
        res.json(record);
      } else {
        res
          .status(404)
          .json({ message: "Attendance not found for the given date." });
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (option === "Update") {
    try {
      const existingRecord = await Attendance.findOne({ uid, date });

      if (!existingRecord) {
        return res
          .status(404)
          .json({ message: "No attendance record found to update." });
      }

      await Attendance.updateOne(
        { uid, date },
        { $set: { slots: attendance.slots } }
      );

      res.json({ message: "Attendance updated successfully" });
    } catch (error) {
      console.error("Error updating attendance:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});
app.post("/postAttendance", async (req, res) => {
  const { uid, option } = req.body;

  if (option === "Fetch") {
    try {
      const timetable = await dashBoardModel.findOne({ uid });
      if (timetable) {
        res.json(timetable);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (option === "Submit") {
    try {
      const { attendance } = req.body;

      // Check if attendance already exists for this UID & Date
      const existingAttendance = await Attendance.findOne({
        uid,
        date: attendance.date,
      });

      if (existingAttendance) {
        return res
          .status(400)
          .json({ message: "Attendance already submitted for today!" });
      }

      // If not found, insert new attendance record
      await Attendance.create(attendance);
      res.json({ message: "Attendance submitted successfully" });
    } catch (error) {
      console.error("Error submitting attendance:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.post("/student", async (req, res) => {
  const { studentId, updatedData } = req.body;

  try {
    const student = await AddedProfile.findOne({ uid: studentId });

    if (!student) {
      return res
        .status(404)
        .json({ exists: false, message: "Student does not exist" });
    }

    if (updatedData) {
      await AddedProfile.updateOne({ uid: studentId }, { $set: updatedData });
      return res.json({
        success: true,
        message: "Student updated successfully",
      });
    } else {
      return res.json({ exists: true, student });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/addstudent", async (req, res) => {
  try {
    console.log("Received /addstudent Request Body:", req.body);

    const { uid, profileDetails } = req.body;

    if (!uid) {
      console.log("❌ Missing UID");
      return res.status(400).json({ message: "Student ID (uid) is required" });
    }

    console.log("✅ UID received:", uid);
    console.log("✅ Profile Details received:", profileDetails);

    for (let field of requiredFields) {
      if (!profileDetails[field] || profileDetails[field].trim() === "") {
        console.log(`❌ Missing Required Field: ${field}`);
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const existingStudent = await studentModel.findOne({ uid });
    if (existingStudent) {
      console.log("❌ Student already exists with UID:", uid);
      return res.status(400).json({ message: "Student already exists" });
    }

    const password = crypto.randomBytes(4).toString("hex");
    console.log("✅ Generated Password:", password);

    // Prepare profile object with trimmed and cleaned data
    const completeProfile = {
      uid,
      ...Object.fromEntries(
        Object.entries(profileDetails).map(([key, value]) => [
          key,
          value?.trim() || null,
        ])
      ),
    };

    console.log("✅ Final Complete Profile to Save:", completeProfile);

    // Save to DB
    const addedprofile = new AddedProfile(completeProfile);
    await addedprofile.save();
    console.log("✅ Profile saved to AddedProfile collection");

    const newStudent = new studentModel({ uid, password });
    await newStudent.save();
    console.log("✅ Student credentials saved to studentModel collection");

    res.json({ message: "Student added successfully", password });
  } catch (err) {
    console.error("🔥 Error adding student:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("Received Body:", req.body);

    const { uid, password } = req.body;

    if (!uid || !password) {
      return res.status(400).json({ message: "Missing uid or password" });
    }

    // Fetch user from MongoDB
    const user = await studentModel.findOne({ uid });

    if (!user) {
      console.log("User not found for UID:", uid);
      return res.status(404).json({ message: "No record existed" });
    }

    if (user.password === password) {
      console.log("Password Matched ✅");
      return res.json({ message: "Success" });
    } else {
      console.log("Password Incorrect ❌");
      return res.status(401).json({ message: "Password Incorrect" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// ✅ Home Route
app.post("/home", async (req, res) => {
  try {
    console.log("Received Home Request:", req.body); // 🔴 Debugging only

    const { uid, section } = req.body;

    if (!uid || !section) {
      return res.status(400).json({ message: "Missing uid or section" });
    }

    if (section === "profile") {
      const user = await AddedProfile.findOne({ uid });
      return user
        ? res.json({ message: "Profile found", user })
        : res.status(404).json({ message: "No user found" });
    }

    if (section === "dashboard") {
      try {
        const user = await dashBoardModel.findOne({ uid });
        if (!user) return res.status(404).json({ message: "No user found" });

        const user2 = await csModel.findOne({ uid });
        if (!user2) return res.status(404).json({ message: "No user2 found" });

        // Fetch all attendance records for the user
        const user3 = await Attendance.find({ uid });

        // Calculate Overall Attendance Percentage
        const totalClasses = user3.length; // Total attendance entries
        const attendedClasses = user3.reduce(
          (sum, record) => sum + record.slots.length,
          0
        );
        const attendancePercentage = totalClasses
          ? ((attendedClasses / (totalClasses * 7)) * 100).toFixed(2)
          : 0;

        return res.json({
          message: "Dashboard found",
          user,
          user2,
          user3,
        });
      } catch (err) {
        console.error("Error fetching dashboard details:", err);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }
    }

    if (section === "attendance") {
      const attendanceRecords = await Attendance.find({ uid });
      if (!attendanceRecords.length) {
        return res.status(404).json({ message: "No attendance records found" });
      }
    
      // Calculate attendance per subject
      let subjectAttendance = {};
    
      attendanceRecords.forEach((record) => {
        record.slots.forEach((slot) => {
          const { subject, isPresent } = slot;
    
          if (!subjectAttendance[subject]) {
            subjectAttendance[subject] = { total: 0, present: 0 };
          }
    
          subjectAttendance[subject].total += 1;
          if (isPresent) subjectAttendance[subject].present += 1;
        });
      });
    
      // Fetch subject names from the subjects model
      const subjectCodes = Object.keys(subjectAttendance);
      const subjectsList = await subjects.find({ courseCode: { $in: subjectCodes } });
    
      // Convert data into frontend-friendly format
      const attendanceData = subjectCodes.map((subjectCode) => {
        const subjectDetails = subjectsList.find((sub) => sub.courseCode === subjectCode);
        return {
          courseCode: subjectCode,
          courseName: subjectDetails ? subjectDetails.courseName : "Unknown Subject",
          percentage: Math.round(
            (subjectAttendance[subjectCode].present / subjectAttendance[subjectCode].total) * 100
          ),
          totalClasses: subjectAttendance[subjectCode].total,
          attendedClasses: subjectAttendance[subjectCode].present,
        };
      });
    
      console.log("🔍 Attendance Data:", attendanceData); // ✅ Print attendanceData for debugging
    
      return attendanceData.length
        ? res.json({ message: "Details Found", attendanceData })
        : res.status(404).json({ message: "No user found" });
    }
    

    if (section === "academic") {
      const user = await academicModel.findOne({ uid });
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      return user
        ? res.json({ message: "Details found", user })
        : res.status(404).json({ message: "No user found" });
    }

    res.status(400).json({ message: "Invalid section" });
  } catch (err) {
    console.error("Error during home section fetch:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

app.post("/alogin", async (req, res) => {
  try {
    const { fid, password } = req.body;

    if (!fid || !password) {
      return res.status(400).json({ message: "Missing fid or password" });
    }
    const user = await facultyModel.findOne({ fid });
    if (!user) {
      console.log("User not found for UID:", fid); // ❌ Incorrect variable
      return res.status(404).json({ message: "No record existed" });
    }

    if (!user) {
      console.log("User not found for UID:", uid);
      return res.status(404).json({ message: "No record existed" });
    }

    if (user.password === password) {
      console.log("Password Matched ✅");
      return res.json({ message: "Success" });
    } else {
      console.log("Password Incorrect ❌");
      return res.status(401).json({ message: "Password Incorrect" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});
app.listen(3000, () => console.log("Server running on port 3000"));
