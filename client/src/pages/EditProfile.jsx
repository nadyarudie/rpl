import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Prefill data user
    (async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        setForm(f => ({ ...f, name: data.name, email: data.email, username: data.username }));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    // Validasi
    if (form.password || form.confirmPassword) {
      if (form.password !== form.confirmPassword) {
        return setError("Password dan konfirmasi harus sama.");
      }
      if (form.password.length < 6) {
        return setError("Password minimal 6 karakter.");
      }
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        username: form.username,
      };
      if (form.password) payload.password = form.password;

      const res = await fetch("/api/user/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Update gagal");
      // sukses
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
          Edit Profile
        </h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {["name", "email", "username"].map(field => (
            <div key={field}>
              <label className="block mb-1 font-medium text-blue-700 capitalize">
                {field}
              </label>
              <input
                name={field}
                type={field === "email" ? "email" : "text"}
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={form[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {/* Password (optional) */}
          <div>
            <label className="block mb-1 font-medium text-blue-700">
              Password Baru
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full border border-blue-200 rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-blue-500"
                value={form.password}
                onChange={handleChange}
                placeholder="Kosongkan jika tidak ganti"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-400 hover:text-blue-700"
                onClick={() => setShowPassword(v => !v)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block mb-1 font-medium text-blue-700">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                className="w-full border border-blue-200 rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-blue-500"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password baru"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-400 hover:text-blue-700"
                onClick={() => setShowConfirm(v => !v)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}
