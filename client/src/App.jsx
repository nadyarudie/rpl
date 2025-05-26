import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard"; 
import EditProfile from "@/pages/EditProfile"; 


export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing
            onLogin={() => navigate("/login")}
            onRegister={() => navigate("/register")}
          />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}
