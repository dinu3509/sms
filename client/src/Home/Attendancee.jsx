import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../pages/UserContext";
import { Line } from "rc-progress";
import { Bar } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Attendancee = () => {
  const section = "attendance";
  const { uid } = useContext(UserContext);
  const [graph, setGraph] = useState("bar");
  const [attendanceData, setAttendanceData] = useState([]);
  const [avgAttendance, setAvgAttendance] = useState(0);

  useEffect(() => {
    if (!uid) return;

    axios
      .post("http://localhost:3000/home", { uid, section })
      .then((res) => {
        if (res.data.attendanceData) {
          setAttendanceData(res.data.attendanceData);
          // Calculate average attendance
          const totalSubjects = res.data.attendanceData.length;
          const avg =
            totalSubjects > 0
              ? res.data.attendanceData.reduce((sum, course) => sum + course.percentage, 0) /
                totalSubjects
              : 0;
          setAvgAttendance(Math.round(avg));
        }
      })
      .catch((err) => {
        console.error("Error fetching attendance:", err);
      });
  }, [uid]);

  const courseCodes = attendanceData.map((course) => course.courseCode);
  const percentages = attendanceData.map((course) => course.percentage);

  const data = {
    labels: courseCodes,
    datasets: [
      {
        label: "Course Attendance",
        data: percentages,
        backgroundColor: percentages.map((p) => (p >= 75 ? "#3A7D44" : "#C14600")),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-auto border rounded-2xl relative px-5 py-4 bg-white shadow-md">
        <div className="absolute top-[-35px] text-2xl font-bold left-2 text-gray-800">
          ATTENDANCE
        </div>

        <div className="text-lg font-semibold mb-3 text-center text-gray-700">
          Course Wise Percentage
        </div>

        <table className="w-full border bg-gray-100 rounded-lg">
          <thead>
            <tr className="border bg-gray-300">
              <th className="w-1/4 p-2">Course Code</th>
              <th className="w-3/4 p-2">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((course, index) => (
                <tr key={index} className="border bg-white">
                  <td className="p-2 text-center text-gray-700">{course.courseCode}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700 w-12 text-right">
                        {course.percentage}%
                      </span>
                      <Line
                        percent={course.percentage}
                        strokeWidth={1}
                        strokeColor={course.percentage >= 75 ? "#3A7D44" : "#C14600"}
                        className="w-full"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-3 text-gray-600">
                  No attendance data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="w-full flex justify-center gap-4 p-5">
          <button
            className={`p-2 border rounded-lg text-gray-700 font-semibold transition ${
              graph === "bar" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setGraph("bar")}
          >
            Bar Chart
          </button>
          <button
            className={`p-2 border rounded-lg text-gray-700 font-semibold transition ${
              graph === "circle" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setGraph("circle")}
          >
            Circle Chart
          </button>
        </div>

        {graph === "bar" ? (
          <div className="w-full flex justify-center">
            <div style={{ width: "600px" }}>
              <Bar data={data} />
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center mt-5">
            <div className="w-40 h-40">
              <CircularProgressbar
                value={avgAttendance}
                text={`${avgAttendance}%`}
                styles={buildStyles({
                  textSize: "20px",
                  textColor: "#333",
                  pathColor: avgAttendance >= 75 ? "#3A7D44" : "#C14600",
                  trailColor: "#ddd",
                })}
              />
            </div>
            <div className="mt-3 text-gray-700 font-semibold">
              Overall Attendance
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendancee;
