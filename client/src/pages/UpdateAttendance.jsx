import React, { useState } from "react";
import axios from "axios";

const UpdateAttendance = () => {
  const [uid, setUid] = useState("");
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing attendance record
  const fetchAttendance = async () => {
    if (!uid || !date) {
      alert("Please enter Student UID and Date!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/updateAttendance", { uid, date, option: "Fetch" });

      if (response.data && response.data.slots) {
        setAttendance(response.data.slots);
      } else {
        alert("No attendance record found for the given date.");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      alert("Failed to fetch attendance.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle attendance status
  const toggleAttendance = (index) => {
    setAttendance((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, isPresent: !slot.isPresent } : slot))
    );
  };

  // Submit updated attendance
  const submitUpdatedAttendance = async () => {
    if (attendance.length === 0) {
      alert("No attendance record to update!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/updateAttendance", {
        uid,
        date,
        option: "Update",
        attendance: { slots: attendance }
      });

      alert("Attendance updated successfully!");
      setAttendance([]);
      setUid("");
      setDate("");
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Attendance</h2>

      {/* Student UID Input */}
      <label className="block font-medium mb-2">Enter Student UID:</label>
      <input
        type="text"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter Student UID"
      />

      {/* Date Input */}
      <label className="block font-medium mb-2">Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <button
        onClick={fetchAttendance}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Fetch Attendance"}
      </button>

      {/* Attendance Table */}
      {attendance.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Time</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Present</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((slot, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">{slot.time}</td>
                <td className="border p-2">{slot.subject}</td>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={slot.isPresent}
                    onChange={() => toggleAttendance(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Submit Updated Attendance */}
      {attendance.length > 0 && (
        <button
          onClick={submitUpdatedAttendance}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Attendance
        </button>
      )}
    </div>
  );
};

export default UpdateAttendance;
