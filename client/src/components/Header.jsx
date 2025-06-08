import React, { useState, useRef, useEffect } from 'react';
import { Wallet, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Header() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('User');
  const ref = useRef(null);
  const navigate = useNavigate(); // Inisialisasi navigate

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setOpen(false);
    window.location.href = '/login'; // Redirect ke login
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-6 py-3 text-white flex items-center justify-between shadow-lg mb-2 w-full">
      <div className="flex items-center gap-3">
        <Wallet size={26} className="text-white drop-shadow" />
        <div className="flex flex-col sm:flex-row sm:items-end gap-0 sm:gap-2">
          <span className="font-semibold text-[1.4rem] sm:text-2xl tracking-tight font-sans drop-shadow">
            Cashil
          </span>
          <span className="text-sm sm:text-base font-light font-sans opacity-85 italic whitespace-nowrap tracking-wide ml-0 sm:ml-2 pb-[1px]">
            Track your money, stay chill.
          </span>
        </div>
      </div>

      {/* Avatar + Username jadi satu klik area */}
      <div
        className="relative flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
        ref={ref}
        tabIndex={0}
        role="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
      >
        {/* Ikon User tanpa lingkaran latar */}
        <User size={24} className="text-white font-bold" />

        {/* Hi, Username */}
        <span className="text-white font-semibold whitespace-nowrap">
          Hi, {username}!
        </span>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-md shadow-lg text-gray-900 ring-1 ring-black ring-opacity-5 z-50">
            <button
              onClick={() => {
                navigate("/edit-profile"); // Navigasi ke halaman EditProfile
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left hover:bg-blue-100 transition"
              type="button"
            >
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="block w-full px-4 py-2 text-left hover:bg-red-100 text-red-600 font-semibold transition"
              type="button"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
