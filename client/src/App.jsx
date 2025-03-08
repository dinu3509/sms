import React, { useState } from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Alogin from "./pages/Alogin";
import Shome from "./pages/Shome";
import Fhome from "./pages/Fhome";
import Addstudent from "./pages/Addstudent";
import UpdateStudent from "./pages/UpdateStudent";
import PostAttendance from "./pages/PostAttendance";
import UpdateAttendance from "./pages/UpdateAttendance";
import Marks from "./pages/Marks";
import { UserProvider } from "./pages/UserContext";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/alogin" element={<Alogin />} />
        <Route path="/home" element={<Shome />} />
        <Route path="/fhome" element={<Fhome />} />
        <Route path="/addStudent" element={<Addstudent />} />
        <Route path="/updateStudent" element={<UpdateStudent />} />
        <Route path="/postAttendance" element={<PostAttendance />} />
        <Route path="/update" element={<UpdateAttendance />} />
        <Route path="/marks" element={<Marks/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
