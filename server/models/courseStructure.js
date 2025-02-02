const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  courseType: { type: String, required: true },
  category: { type: String, required: true },
  audit: { type: String, required: true },
  credits: { type: String, required: true },
  attendancePercentage: { type: Number, required: true }
});

const semesterSchema = new mongoose.Schema({
  semester: { type: Number, required: true },
  courses: [courseSchema]
});

const courseModelSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  semesters: [semesterSchema]
});

const courseModel = mongoose.model("CourseStructures", courseModelSchema);
module.exports = courseModel;
