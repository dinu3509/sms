import React, { useState } from "react";
import axios from "axios";

const PostAttendance = () => {
const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1); // Subtract 1 day

const todayName = today.toLocaleDateString("en-US", { weekday: "long" });
const yesterdayName = yesterday.toLocaleDateString("en-US", { weekday: "long" });
  const [uid, setUid] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [attendance, setAttendance] = useState({}); // { slotId: true/false }
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodaysTimetable = async () => {
    if (!uid) {
      alert("Please enter Student UID!");
      return;
    }
    let option = "Fetch";

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/postAttendance",
        { uid, option }
      );

      const studentData = response.data; // Whole object with cgpa, name, timetable, etc.
      console.log("Full Student Data:", studentData);

      const fullTimetable = studentData.timetable; // Extract timetable part
      if (!fullTimetable) {
        alert("No timetable found in student data!");
        setIsLoading(false);
        return;
      }

      if (fullTimetable[yesterdayName]) {
        const todaysTimetable = Object.entries(fullTimetable[yesterdayName])
          .filter(([time, subject]) => subject.trim() !== "") 
          .map(([time, subject], index) => ({
            slotId: `${yesterdayName}-${index + 1}`, 
            time,
            subject,
          }));

        setTimetable(todaysTimetable);
        console.log("Today's Timetable:", todaysTimetable);

        const initialAttendance = {};
        todaysTimetable.forEach((slot) => {
          initialAttendance[slot.slotId] = false;
        });
        setAttendance(initialAttendance);
      } else {
        setTimetable([]);
        alert(`No timetable found for ${todayName}.`);
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
      alert("Failed to fetch timetable.");
    } finally {
      setIsLoading(false);
    }
  };
  const toggleAttendance = (slotId, isPresent) => {
    setAttendance((prev) => ({
      ...prev,
      [slotId]: isPresent,
    }));
  };

  const submitAttendance = async () => {
    if (timetable.length === 0) {
      alert("No timetable to submit!");
      return;
    }

    const attendanceData = {
      uid: uid,
      date: new Date().toISOString().split("T")[0],
      day: todayName,
      slots: timetable.map((slot) => ({
        time: slot.time,
        subject: slot.subject,
        isPresent: attendance[slot.slotId] || false,
      })),
    };

    try {
      const option = "Submit";
      await axios.post("http://localhost:3000/postAttendance", {
        uid,
        option,
        attendance: attendanceData,
      });

      alert("Attendance submitted successfully!");
      setAttendance({});
      setTimetable([]);
      setUid("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("⚠️ Attendance already submitted for today!");
      } else {
        console.error("Error submitting attendance:", error);
        alert("Failed to submit attendance.");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Post Attendance</h2>

      {/* Student UID Input */}
      <label className="block font-medium mb-2">Enter Student UID:</label>
      <input
        type="text"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter Student UID"
      />
      <button
        onClick={fetchTodaysTimetable}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Fetch Timetable"}
      </button>

      {/* Timetable & Attendance */}
      {timetable.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Slot ID</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Present</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((slot) => (
              <tr key={slot.slotId}>
                <td className="border p-2 text-center">{slot.slotId}</td>
                <td className="border p-2">{slot.time}</td>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={attendance[slot.slotId] || false}
                    onChange={(e) =>
                      toggleAttendance(slot.slotId, e.target.checked)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Submit Attendance */}
      {timetable.length > 0 && (
        <button
          onClick={submitAttendance}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Attendance
        </button>
      )}
    </div>
  );
};

export default PostAttendance;
