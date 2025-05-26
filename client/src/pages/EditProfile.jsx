import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi update
    alert("Profile updated! (Simulasi)");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-blue-100">

        {/* Tombol Back ke Dashboard */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h2 className="text-2xl font-semibold mb-8 text-blue-700 text-center tracking-tight">
          Edit Profile
        </h2>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-blue-700">Nama</label>
            <input
              name="name"
              type="text"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-700">Email</label>
            <input
              name="email"
              type="email"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-700">Username</label>
            <input
              name="username"
              type="text"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full border border-blue-200 rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-400 hover:text-blue-700"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-700">Konfirmasi Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                className="w-full border border-blue-200 rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-400 hover:text-blue-700"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base tracking-wide"
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
