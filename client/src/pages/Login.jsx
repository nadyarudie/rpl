import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    if (!form.username || !form.password) {
      setError({ general: "Username dan password wajib diisi!" });
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token || "");
      localStorage.setItem("username", res.data.user.username || "User"); // Simpan username
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError({ general: err.response.data.message });
      } else {
        setError({ general: "Login gagal. Coba lagi." });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <ArrowLeft size={20} />
          Home
        </button>

        <h2 className="text-2xl font-semibold mb-8 text-blue-700 text-center tracking-tight">
          Login
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error.general && (
            <p className="text-red-500 text-xs mb-4">{error.general}</p>
          )}
          <div>
            <label className="block mb-1 font-medium text-blue-700">Username</label>
            <input
              name="username"
              type="text"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
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
          <Button
            type="submit"
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base tracking-wide"
          >
            Login
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
