import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Addstudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uid: "",
    profile: {},
    personal: {},
    address: {},
  });

  const [selectedSemester, setSelectedSemester] = useState(null);
  const [semesterCourses, setSemesterCourses] = useState([]);
  const [error, setError] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const profileFields = [
    "Campus",
    "College",
    "Batch",
    "Degree",
    "Program",
    "Branch",
    "Class",
    "Section",
    "Semester",
  ];

  const personalFields = [
    "Student Full Name",
    "Aadhar Number",
    "DOB",
    "Blood Group",
    "Mobile Number",
    "Email",
    "Gender",
    "Nationality",
    "Religion",
    "Father Name",
    "Mother Name",
    "Category",
  ];

  const addressFields = [
    "Door Number",
    "Location",
    "City",
    "State",
    "Country",
    "Pincode",
  ];

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    if (section === "profile" && field === "Semester") {
      handleSemesterChange(value);
    }
  };

  const handleSemesterChange = (value) => {
    const semester = parseInt(value, 10);
    setSelectedSemester(semester >= 1 && semester <= 6 ? semester : null);
    loadSemesterCourses(semester);
  };

  const loadSemesterCourses = (semester) => {
    const allSemesters = {
      1: [
        { courseCode: "CHEM1001", courseName: "Chemistry", credits: 4 },
        { courseCode: "CHEM1001P", courseName: "Chemistry Lab", credits: 0 },
        { courseCode: "CLAD1011", courseName: "Leadership Skills and Quantitative Aptitude (Soft Skills 2)", credits: 1 },
        { courseCode: "CSEN1001", courseName: "IT Productivity Tools", credits: 1 },
        { courseCode: "CSEN1021", courseName: "Programming with Python", credits: 3 },
        { courseCode: "EECE3501", courseName: "Robotics", credits: 3 },
        { courseCode: "LANG1021", courseName: "Advanced Communication Skills in English", credits: 2 },
        { courseCode: "MATH1041", courseName: "Discrete Mathematics", credits: 2 },
        { courseCode: "MATH1051", courseName: "Graph Theory", credits: 2 },
        { courseCode: "MECH1021", courseName: "Workshop", credits: 2 },
        { courseCode: "POLS1001", courseName: "Indian Constitution and History", credits: 2 },
        { courseCode: "VEDC1001", courseName: "Venture Development", credits: 2 },
      ],
      2: [
        { courseCode: "CLAD1021", courseName: "Verbal Ability and Quantitative Ability (Soft Skills 3)", credits: 1 },
        { courseCode: "CSEN1041", courseName: "Computer Engineering Workshop", credits: 1 },
        { courseCode: "CSEN1051", courseName: "Digital Logic Circuits", credits: 3 },
        { courseCode: "CSEN1071", courseName: "Data Communications", credits: 2 },
        { courseCode: "CSEN2001", courseName: "Data Structures", credits: 4 },
        { courseCode: "CSEN2001P", courseName: "Data Structures Lab", credits: 0 },
        { courseCode: "ENVS1001", courseName: "Environmental Studies", credits: 3 },
        { courseCode: "IENT2001", courseName: "Entrepreneurship", credits: 2 },
        { courseCode: "MATH2291", courseName: "Linear Algebra", credits: 2 },
        { courseCode: "MATH2311", courseName: "Number Theory", credits: 2 },
        { courseCode: "MECH3191", courseName: "Waste to Energy", credits: 3 },
        { courseCode: "PHPY1001", courseName: "Gandhi for the 21st Century", credits: 2 },
        { courseCode: "PHYS1021", courseName: "Principles of Quantum Mechanics", credits: 4 },
      ],
      3: [
        { courseCode: "CLAD1031", courseName: "Practicing Verbal Ability and Quantitative Aptitude", credits: 1 },
        { courseCode: "CSEN1031", courseName: "Artificial Intelligence Applications", credits: 1 },
        { courseCode: "CSEN1101", courseName: "Operating Systems", credits: 4 },
        { courseCode: "CSEN1101P", courseName: "Operating Systems Lab", credits: 0 },
        { courseCode: "CSEN1111", courseName: "Object Oriented Programming with Java", credits: 2 },
        { courseCode: "CSEN2011", courseName: "Computer Organization and Architecture", credits: 3 },
        { courseCode: "CSEN2021", courseName: "Computer Networks", credits: 4 },
        { courseCode: "CSEN2021P", courseName: "Computer Networks Lab", credits: 0 },
        { courseCode: "CSEN2131", courseName: "Computer Graphics", credits: 3 },
        { courseCode: "EECE2141", courseName: "Telecommunications for Society", credits: 3 },
        { courseCode: "HSMCH102", courseName: "Universal Human Values 2: Understanding Harmony", credits: 0 },
        { courseCode: "MATH2361", courseName: "Probability and Statistics", credits: 3 },
      ],
      4: [
        { courseCode: "24CSEN1051", courseName: "Intermediate Coding", credits: 0 },
        { courseCode: "CLAD2001", courseName: "Preparation For Campus Placement-1 (Soft Skills 5A)", credits: 1 },
        { courseCode: "CSEN1131", courseName: "Software Engineering", credits: 4 },
        { courseCode: "CSEN1131P", courseName: "Software Engineering Lab", credits: 0 },
        { courseCode: "CSEN2041", courseName: "Formal Languages and Automata Theory", credits: 3 },
        { courseCode: "CSEN2061", courseName: "Database Management Systems", credits: 4 },
        { courseCode: "CSEN2061P", courseName: "Database Management Systems Lab", credits: 0 },
        { courseCode: "CSEN3001", courseName: "Design and Analysis of Algorithms", credits: 3 },
        { courseCode: "CSEN3221", courseName: "Distributed Systems", credits: 3 },
        { courseCode: "IENT2021", courseName: "Entrepreneurship Strategy: From Ideation To Exit", credits: 1 },
        { courseCode: "MECH1001", courseName: "Design Thinking", credits: 1 },
        { courseCode: "MKTG3011", courseName: "Sales and Distribution Management", credits: 3 },
      ],
      5: [
        { courseCode: "24CSEN1081", courseName: "Intermediate Coding-II", credits: 0 },
        { courseCode: "CLAD2031", courseName: "Preparation For Campus Placement-2 (Soft Skills 6A)", credits: 1 },
        { courseCode: "CSEN2031", courseName: "Artificial Intelligence", credits: 4 },
        { courseCode: "CSEN2031P", courseName: "Artificial Intelligence Lab", credits: 0 },
        { courseCode: "CSEN2071", courseName: "Cryptography and Network Security", credits: 3 },
        { courseCode: "CSEN2111", courseName: "Agile Software Development", credits: 3 },
        { courseCode: "CSEN3031", courseName: "Compiler Design", credits: 4 },
        { courseCode: "CSEN3031P", courseName: "Compiler Design Lab", credits: 0 },
        { courseCode: "CSEN3071", courseName: "Web Application Development and Software Frameworks", credits: 4 },
        { courseCode: "CSEN3071P", courseName: "Web Application Development and Software Frameworks Lab", credits: 0 },
        { courseCode: "FINA3011", courseName: "Financial Markets and Services", credits: 3 },
        { courseCode: "INTN2333", courseName: "Internship 1", credits: 0 },
      ],
      6: [
        { courseCode: "CSEN3151", courseName: "Software Testing", credits: 3 },
        { courseCode: "CSEN3161", courseName: "Cloud Computing", credits: 3 },
        { courseCode: "CSEN3251", courseName: "Machine Learning", credits: 3 },
        { courseCode: "CSEN3251P", courseName: "Machine Learning Lab", credits: 0 },
        { courseCode: "CSEN4031", courseName: "Project Management", credits: 3 },
        { courseCode: "CSEN4051", courseName: "Big Data Analytics", credits: 3 },
        { courseCode: "CSEN4051P", courseName: "Big Data Analytics Lab", credits: 0 },
        { courseCode: "INTN2444", courseName: "Internship 2", credits: 0 },
        { courseCode: "MATH2391", courseName: "Optimization Techniques", credits: 3 },
        { courseCode: "REMG3001", courseName: "Disaster Risk Reduction and Management", credits: 3 },
      ],
    };
    

    let coursesToDisplay = [];
    for (let i = 1; i <= semester; i++) {
      coursesToDisplay = [...coursesToDisplay, ...allSemesters[i]];
    }
    setSemesterCourses(coursesToDisplay);
  };

  const handleSubmit = async () => {
    setError("");
    setGeneratedPassword("");

    const cleanedProfileDetails = {
      ...formData.profile,
      ...formData.personal,
      ...formData.address,
    };

    const sanitizedProfileDetails = {};
    Object.keys(cleanedProfileDetails).forEach((key) => {
      const sanitizedKey = key.replace(/ /g, "");
      sanitizedProfileDetails[sanitizedKey] = cleanedProfileDetails[key]?.trim() || null;
    });

    const payload = {
      uid: formData.uid,
      profileDetails: sanitizedProfileDetails,
    };

    try {
      const response = await axios.post("http://localhost:3000/addstudent", payload);
      setGeneratedPassword(response.data.password);
      alert("Student Added Successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <button onClick={() => navigate("/fhome")} className="mb-4 px-4 py-2 bg-gray-300 rounded">
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-6">Add Student - Profile Details</h1>

      {/* UID Input */}
      <div className="mb-4">
        <label className="text-sm font-medium">Student ID (UID)</label>
        <input
          type="text"
          value={formData.uid}
          onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
          placeholder="Enter Student ID"
          className="p-2 border rounded-md w-full"
        />
      </div>

      {/* Sections */}
      <Section title="Profile Information" fields={profileFields} onChange={(field, value) => handleChange("profile", field, value)} />
      <Section title="Personal Information" fields={personalFields} onChange={(field, value) => handleChange("personal", field, value)} />
      <Section title="Address Information" fields={addressFields} onChange={(field, value) => handleChange("address", field, value)} />

      {/* Course Structure */}
      {selectedSemester && (
        <div className="mt-6 p-4 border rounded-lg bg-white shadow">
          <h2 className="text-xl font-bold mb-4">Course Structure (Up to Semester {selectedSemester})</h2>
          {semesterCourses.map((course, index) => (
            <div key={index} className="p-2 border-b">
              <strong>{course.courseCode}</strong>: {course.courseName} ({course.credits} credits)
            </div>
          ))}
        </div>
      )}

      {/* Error & Password Messages */}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {generatedPassword && (
        <div className="mt-4 p-3 bg-green-100 border border-green-500 rounded">
          Student Added! Generated Password: <strong>{generatedPassword}</strong>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6 text-right">
        <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
          Submit
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, fields, onChange }) => (
  <div className="mb-8 p-4 border rounded-lg bg-white shadow">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {fields.map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-sm font-medium">{field}</label>
          <input
            type={field === "DOB" ? "date" : "text"}
            placeholder={`Enter ${field}`}
            onChange={(e) => onChange(field, e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>
      ))}
    </div>
  </div>
);

export default Addstudent;
