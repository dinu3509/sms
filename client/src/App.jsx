import React, { useState } from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Alogin from "./pages/Alogin";
import Shome from "./pages/Shome";
import { UserProvider } from "./pages/UserContext";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/alogin" element={<Alogin />} />
        <Route path="/home" element={<Shome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
