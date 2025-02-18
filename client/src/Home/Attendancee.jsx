import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../pages/UserContext";
import { Line, Circle } from "rc-progress";
import { Bar } from "react-chartjs-2";
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
  const [userData, setUserData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [courses, setCourses] = useState([]); // ✅ Store courses here

  const section = "attendance";
  const { semester } = useContext(UserContext);
  const { uid } = useContext(UserContext);

  useEffect(() => {
    if (!uid) return; // Prevent API call if uid is undefined/null

    axios
      .post("http://localhost:3000/home", { uid, section })
      .then((res) => {
        if (res.data.user) {
          const user = res.data.user;
          console.log("User Data:", user);

          // Extract semesters from user object
          const semesters = user.semesters || []; // Ensure semesters exist
          setUserData(semesters);

          // Find the selected semester's courses
          const selectedSemester = semesters.find(
            (sem) => sem.semester === semester +1
          );
          console.log(semester)
          setCourses(selectedSemester ? selectedSemester.courses : []);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [uid, section, semester]);
  const courseCodes = courses?.map((course) => course.courseCode); // Extract course codes
  const percentages = courses?.map((course) => course.percentage); // Extract percentages
  const data = {
    labels: courseCodes, // X-Axis: Course Codes
    datasets: [
      {
        label: "Course Performance",
        data: percentages, // Y-Axis: Percentages
        backgroundColor: percentages.map((p) => (p > 75 ? "#3A7D44" : "#C14600")), // Color based on percentage
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (value) => value + "%",
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90, // Forces vertical labels
        },
      },
    },
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-auto border rounded-2xl relative px-5 py-4">
        <div className="absolute top-[-35px] text-2xl font-bold left-2">
          ATTENDANCE
        </div>

        <div className="title">Course Wise Percentage</div>
        <div className="attendnceTable border border-collapse">
          <table className="w-full">
            <thead>
              <tr className="border">
                <th className="w-1/4">Course Code</th>
                <th className="w-2/4">Course Name</th>
                <th className="w-1/4">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <tr key={index} className="border">
                    <td className="w-1/4">{course.courseCode}</td>
                    <td className="w-2/4">{course.courseName}</td>
                    <td className="w-1/4">
                      {course.percentage}%
                      <Line
                        percent={course.percentage}
                        strokeWidth={2}
                        strokeColor={
                          course.percentage > 75 ? "#3A7D44" : "#C14600"
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-3">
                    No courses available for this semester
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="w-full flex justify-center p-7 relative">
            <div className="flex h-fit gap-2 absolute left-10 ">
              <button className="cursor-pointer p-2 border flex justify-center items-center rounded">
                <span class="material-symbols-rounded">bar_chart</span>
              </button>

              <button className="cursor-pointer p-2 border rounded flex justify-center items-center">
                <span class="material-symbols-rounded">circle</span>
              </button>
            </div>
            <div className="w-100 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">
                80%
              </div>
              <Circle
                percent={80}
                strokeWidth={2}
                strokeColor="#3A7D44"
                trailColor="#C14600"
              ></Circle>
            </div>
            <div className="">
            <div style={{ width: "600px", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendancee;
