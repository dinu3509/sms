import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Alogin from "./pages/Alogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/alogin" element={<Alogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
