const mongoose = require("mongoose");

const semesterCourseSchema = new mongoose.Schema({
  semester: { type: Number, required: true },
    courses: [
        {
        
        name: { type: String, required: true },
        grade : { type: String, required: true }
        
        }
    ]
});

const academicSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  semesters : [semesterCourseSchema]
});


const academicModel = mongoose.model("AcademicStructure", academicSchema);
module.exports = academicModel;