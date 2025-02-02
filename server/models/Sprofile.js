const mongoose = require('mongoose');

const sProfileSchema = new mongoose.Schema({
    registrationNo: String,
    campus: String,
    college: String,
    batch: String,
    program: String,
    branch: String,
    degree: String,
    class: String,
    section: String,
    semester: Number,
   
    studentFullName: String,
    dob: String,
    bloodGroup: String,
    email: String,
    gender: String,
    nationality: String,
    motherName: String,
    category: String,
    mobileNumber: String,
    fatherName: String,
    religion: String,
    
    doorNumber: String,
    location: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
    aadharNumber: String
    
});




const sprofile = mongoose.model("Profile", sProfileSchema);
module.exports = sprofile;
