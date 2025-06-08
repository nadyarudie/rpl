import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/dashboard";
import EditProfile from "@/pages/editProfile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}
