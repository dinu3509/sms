import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");

  const fetchStudent = () => {
    axios
      .post("http://localhost:3000/student", { studentId })
      .then((res) => {
        setStudentData(res.data.student);
        setError("");
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError("Student does not exist");
          setStudentData(null);
        } else {
          setError("Error fetching student details.");
        }
      });
  };

  const updateStudent = () => {
    axios
      .post("http://localhost:3000/student", {
        studentId,
        updatedData: studentData,
      })
      .then(() => alert("Student updated successfully!"))
      .catch(() => alert("Failed to update student."));
  };

  const handleChange = (field, value) => {
    setStudentData((prev) => ({ ...prev, [field]: value }));
  };

  const renderInput = (field, value) => {
    return (
      <div key={field} className="space-y-1">
        <label className="block text-sm font-medium capitalize">{field}</label>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className="border p-2 w-full"
        />
      </div>
    );
  };

  return (
    <div className="p-5">
      <button
        onClick={() => navigate("/fhome")}
        className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
      >
        <span className="material-symbols-rounded">arrow_back</span>
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Update Student Profile</h1>

      <div className="flex items-center space-x-3 mb-5">
        <input
          type="text"
          placeholder="Enter Student UID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={fetchStudent}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {studentData && (
        <div className="space-y-4">
          {Object.entries(studentData)
            .filter(([key]) => key !== "_id" && key !== "__v") // Exclude _id and __v
            .map(([key, value]) => renderInput(key, value))}

          <button
            onClick={updateStudent}
            className="bg-green-500 text-white px-5 py-2 rounded"
          >
            Update Student
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateStudent;
