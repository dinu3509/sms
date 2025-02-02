const mongoose = require("mongoose");

const dashBoard = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timetable: {
    Monday: { type: Map, of: String, default: {} },
    Tuesday: { type: Map, of: String, default: {} },
    Wednesday: { type: Map, of: String, default: {} },
    Thursday: { type: Map, of: String, default: {} },
    Friday: { type: Map, of: String, default: {} },
  },
  cgpa: { type: Number },
  sgpa: [{ semester: Number, value: Number }],
  courses: [
    {
      code: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
  name: { type: String },
});

const dashBoardModel = mongoose.model("DashBoard", dashBoard);
module.exports = dashBoardModel;
