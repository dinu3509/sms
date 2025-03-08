const mongoose = require("mongoose");

const SubjectAttendanceSchema = new mongoose.Schema({
  subjectName: { type: String, required: true }, // e.g., "Computer Networks"
  subjectCode: { type: String, required: true }, // e.g., "CSEN2071"
  totalClasses: { type: Number, default: 0 }, // Total conducted classes
  totalPresent: { type: Number, default: 0 }, // Number of presents
  totalAbsent: { type: Number, default: 0 }, // Number of absents
});

const AttendanceSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Student ID
  subjects: { type: [SubjectAttendanceSchema], default: [] }, // Array of subjects with attendance details
});

const subjects = mongoose.model("Subjects", AttendanceSchema);

module.exports = subjects;
