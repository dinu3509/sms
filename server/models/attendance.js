const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    date: { type: String, required: true },
    day: { type: String, required: true }, // Monday, Tuesday, ...
    slots: [
        {
            time: String,
            subject: String,
            isPresent: Boolean
        }
    ]
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
