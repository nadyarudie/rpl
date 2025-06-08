import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  // Validasi sederhana
  const validate = () => {
    let e = {};
    if (!form.name) e.name = "Nama wajib diisi.";
    if (!form.email) e.email = "Email wajib diisi.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format email tidak valid.";
    if (!form.username) e.username = "Username wajib diisi.";
    if (!form.password) e.password = "Password wajib diisi.";
    else if (form.password.length < 6) e.password = "Password minimal 6 karakter.";
    if (!form.confirmPassword) e.confirmPassword = "Konfirmasi password wajib diisi.";
    else if (form.confirmPassword !== form.password)
      e.confirmPassword = "Password tidak sama.";
    setError(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Ganti URL jika backend kamu beda
        await axios.post("http://localhost:5000/api/auth/register", {
          name: form.name,
          email: form.email,
          username: form.username,
          password: form.password,
        });
        alert("Register berhasil! Silakan login.");
        navigate("/login");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError({ general: err.response.data.message });
        } else {
          setError({ general: "Gagal register. Coba lagi!" });
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
        {/* Tombol Back */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <ArrowLeft size={20} />
          Home
        </button>

        <h2 className="text-2xl font-semibold mb-8 text-blue-700 text-center tracking-tight">
          Register
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Error umum jika ada */}
          {error.general && (
            <p className="text-red-500 text-xs mb-4">{error.general}</p>
          )}
          <div>
            <label className="block mb-1 font-medium text-blue-700">Nama Lengkap</label>
            <input
              name="name"
              type="text"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {error.name && (
              <p className="text-red-500 text-xs mt-1">{error.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-700">Email</label>
            <input
              name="email"
              type="email"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1">{error.email}</p>
            )}
          </div>
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
            {error.username && (
              <p className="text-red-500 text-xs mt-1">{error.username}</p>
            )}
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
                autoComplete="new-password"
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
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-700">Konfirmasi Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
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
            {error.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{error.confirmPassword}</p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base tracking-wide"
          >
            Register
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
