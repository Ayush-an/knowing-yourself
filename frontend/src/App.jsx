import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Personality from "./pages/Personality";
import SWOT from "./pages/SWOT";
import Improvement from "./pages/Improvement";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminResponses from "./pages/AdminResponses";
import Profile from "./pages/Profile";

function App() {

  return (

    <AuthProvider>
      <BrowserRouter>

        <Navbar />

        <div className="max-w-7xl mx-auto p-6 pt-28">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/personality" element={<Personality />} />

            <Route path="/swot" element={<SWOT />} />

            <Route path="/improvement" element={<Improvement />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/admin/responses" element={<AdminResponses />} />

            <Route path="/profile" element={<Profile />} />

          </Routes>

        </div>

      </BrowserRouter>
    </AuthProvider>

  );

}

export default App;