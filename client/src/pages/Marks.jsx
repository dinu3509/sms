import React, { useState } from "react";
import axios from "axios";
import { Pencil, Check, PlusCircle, Plus, Upload } from "lucide-react";

const Marks = () => {
  const [uid, setUid] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [newGrade, setNewGrade] = useState("");
  const [newCourse, setNewCourse] = useState({ name: "", grade: "" });

  // ✅ Fix: Add "fetch" action
  const fetchMarks = () => {
    if (!uid.trim()) return alert("Please enter a UID!");
    setLoading(true);

    axios
      .post("http://localhost:3000/marks", { uid, action: "fetch" })
      .then((res) => {
        if (res.data.semesters?.length > 0) {
          setMarksData(res.data.semesters);
        } else {
          setMarksData([]); // No marks found
        }
      })
      .catch((err) => console.error("Error fetching marks:", err))
      .finally(() => setLoading(false));
  };

  // ✅ Fix: Update backend after editing a grade
  const handleSave = (semesterIndex, courseIndex) => {
    const updatedMarks = [...marksData];
    updatedMarks[semesterIndex].courses[courseIndex].grade = newGrade;
    setMarksData(updatedMarks);
    setEditing(null);

    axios
      .post("http://localhost:3000/marks", { uid, action: "update", updatedMarks })
      .catch((err) => console.error("Error updating marks:", err));
  };

  // ✅ Fix: Ensure new semester is added to backend
  const handleAddSemester = () => {
    const newSemester = {
      semester: marksData.length + 1,
      courses: [],
    };

    const updatedMarks = [...marksData, newSemester];
    setMarksData(updatedMarks);

    axios
      .post("http://localhost:3000/marks", { uid, action: "update", updatedMarks })
      .catch((err) => console.error("Error adding semester:", err));
  };

  // ✅ Fix: Ensure new course is added to backend
  const handleAddCourse = (semesterIndex) => {
    if (!newCourse.name.trim() || !newCourse.grade.trim()) {
      return alert("Please enter a course name and grade.");
    }

    const updatedMarks = [...marksData];
    updatedMarks[semesterIndex].courses.push({
      name: newCourse.name,
      grade: newCourse.grade,
    });
    setMarksData(updatedMarks);
    setNewCourse({ name: "", grade: "" });

    axios
      .post("http://localhost:3000/marks", { uid, action: "update", updatedMarks })
      .catch((err) => console.error("Error adding course:", err));
  };

  // ✅ Fix: Ensure submit button properly updates backend
  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/marks", { uid, action: "update", updatedMarks: marksData })
      .then(() => alert("Marksheet submitted successfully!"))
      .catch((err) => console.error("Error submitting marks:", err));
  };
  return (
    <div className="flex flex-col items-center p-6">
      {/* UID Input Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-5 mb-5">
        <h2 className="text-xl font-bold text-gray-800 text-center">Enter UID</h2>
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="Enter UID..."
            className="border rounded-lg p-2 w-full"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            onClick={fetchMarks}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch"}
          </button>
        </div>
      </div>

      {/* Marks Display Section */}
      {marksData.length > 0 ? (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-5">
          <h2 className="text-2xl font-bold text-center text-gray-800">Marksheet</h2>

          {marksData.map((sem, semIndex) => (
            <div key={sem.semester} className="mb-5">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Semester {sem.semester}
              </h3>
              <table className="w-full border rounded-lg bg-gray-100">
                <thead>
                  <tr className="border bg-gray-300">
                    <th className="p-2">Course</th>
                    <th className="p-2">Grade</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sem.courses.map((course, courseIndex) => (
                    <tr key={courseIndex} className="border bg-white">
                      <td className="p-2 text-gray-700">{course.name}</td>
                      <td className="p-2 text-center">
                        {editing?.semester === semIndex &&
                        editing?.index === courseIndex ? (
                          <input
                            type="text"
                            value={newGrade}
                            onChange={(e) => setNewGrade(e.target.value)}
                            className="border p-1 rounded w-16 text-center"
                          />
                        ) : (
                          <span className="text-gray-800">{course.grade}</span>
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {editing?.semester === semIndex &&
                        editing?.index === courseIndex ? (
                          <button
                            className="text-green-600 hover:text-green-800"
                            onClick={() => handleSave(semIndex, courseIndex)}
                          >
                            <Check size={18} />
                          </button>
                        ) : (
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleEdit(semIndex, courseIndex, course.grade)}
                          >
                            <Pencil size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add New Course Section */}
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="New Course Name"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="border p-2 rounded-lg w-64"
                />
                <input
                  type="text"
                  placeholder="Grade"
                  value={newCourse.grade}
                  onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
                  className="border p-2 rounded-lg w-16 text-center"
                />
                <button
                  className="bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700 flex items-center gap-2"
                  onClick={() => handleAddCourse(semIndex)}
                >
                  <Plus size={18} /> Add Course
                </button>
              </div>
            </div>
          ))}

          {/* Add Semester Button */}
          <div className="flex justify-center mt-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              onClick={handleAddSemester}
            >
              <PlusCircle size={18} /> Add New Semester
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
              onClick={handleSubmit}
            >
              <Upload size={20} /> Submit Marksheet
            </button>
          </div>
        </div>
      ) : (
        uid &&
        !loading && (
          <div className="text-center text-gray-600">
            <p>No marks data found for UID {uid}.</p>
            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              onClick={handleAddSemester}
            >
              Add New Semester
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Marks;
