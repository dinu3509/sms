const mongoose = require("mongoose");
const facultySchema = new mongoose.Schema({
  fid: { type: String, required: true },
  password: { type: String, required: true },
});
const facultyModel = mongoose.model("faculty", facultySchema);
module.exports = facultyModel;
