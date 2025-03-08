import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../pages/UserContext";

const Academic = () => {
  const { uid } = useContext(UserContext);
  const [reqSem, setReqSem] = useState(1);
  const [curSemCourses, setCurSemCourses] = useState([]);
  const [userData, setUserData] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const section = "academic";

  useEffect(() => {
    if (!uid || dataFetched) return;

    axios
      .post("http://localhost:3000/home", { uid, section })
      .then((res) => {
        if (res.data.user) {
          const user = res.data.user;
          const userArray = Object.keys(user).map((key) => ({
            key,
            value: user[key],
          }));
          setUserData(userArray);
          setDataFetched(true);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [uid]);

  useEffect(() => {
    const sem = userData.find((item) => item.key === "semesters")?.value;
    if (sem) setSemesters(sem);
  }, [userData]);

  useEffect(() => {
    const curSem = semesters[reqSem - 1];
    setCurSemCourses(curSem?.courses || []);
  }, [semesters, reqSem]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Academic Track</h1>

      {/* Semester Tabs */}
      <div className="flex space-x-3 mb-6 overflow-x-auto">
        {semesters.map((item, index) => (
          <button
            key={index}
            onClick={() => setReqSem(Number(item.semester))}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              reqSem === Number(item.semester)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Semester {item.semester}
          </button>
        ))}
      </div>

      {/* Grades Table */}
      <div className="bg-white shadow rounded-xl p-6 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Semester {reqSem} - Courses & Grades
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-gray-700">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="border p-3 text-left">Course Code</th>
                <th className="border p-3 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {curSemCourses.length > 0 ? (
                curSemCourses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-3">{course.name}</td>
                    <td className="border p-3">{course.grade}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    No data available for Semester {reqSem}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Academic;
