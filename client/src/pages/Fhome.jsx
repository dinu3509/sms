import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Fhome = () => {
  const navigate = useNavigate();

  const items = [
    { name: "Add Student", icon: "person_add", link: "/addStudent" },
    {
      name: "Post Attendance",
      icon: "playlist_add_check",
      link: "/postAttendance",
    },
    { name: "Update Marks", icon: "edit_note", link: "/marks" },
    { name: "Give Announcement", icon: "campaign", link: "/giveAnnouncement" },
    { name: "Update Student", icon: "person_edit", link: "/updateStudent" },
    { name: "Student Academics", icon: "badge", link: "/addStudent" },
    { name: "Update Attendance", icon: "badge", link: "/update" },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-red-50 w-full p-8">
        <div className="w-full h-full border rounded-2xl bg-white shadow-md">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-7 p-7">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.link)}
                className="border flex flex-col items-center justify-center h-32 gap-2 rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer"
              >
                <span className="material-symbols-rounded text-4xl">
                  {item.icon}
                </span>
                <div className="text-base font-medium">{item.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fhome;
