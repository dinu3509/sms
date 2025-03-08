const mongoose = require('mongoose');

const addedProfileSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    Campus: String,
    College: String,
    Batch: String,
    Degree: String,
    Program: String,
    Branch: String,
    Class: String,
    Section: String,
    Semester: Number,

    StudentFullName: String,
    DOB: String,
    BloodGroup: String,
    Email: String,
    Gender: String,
    Nationality: String,
    MotherName: String,
    Category: String,
    MobileNumber: String,
    FatherName: String,
    Religion: String,

    DoorNumber: String,
    Location: String,
    City: String,
    State: String,
    Pincode: String,
    Country: String,
    AadharNumber: String
});

const AddedProfile = mongoose.model("AddedProfile", addedProfileSchema);

module.exports = AddedProfile;
