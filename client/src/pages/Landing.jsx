import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import cashilLogo from "@/assets/cashilLogo.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100/70 via-white to-white relative overflow-hidden">

      {/* Aksen background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] rounded-full bg-blue-200/50 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-[30vw] h-[20vw] rounded-full bg-blue-100/60 blur-2xl z-0"></div>
      <div className="absolute top-10 right-0 w-[18vw] h-[18vw] rounded-full bg-blue-300/20 blur-2xl z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <img
          src={cashilLogo}
          alt="Cashil Logo"
          className="
            w-40 h-40
            animate-float
            transition-transform
            hover:scale-110 hover:-translate-y-2
            duration-300
            ease-in-out
            shadow-xl
            rounded-full
            bg-white
            mb-7
          "
          draggable={false}
        />
        <h1 className="text-5xl font-semibold text-blue-700 mb-1 drop-shadow tracking-tight text-center">
          Cashil
        </h1>
        <p className="mb-10 text-blue-800 text-lg sm:text-xl font-medium font-sans opacity-85 tracking-wide text-center flex items-center gap-2">
          Track your money, stay chill
        </p>
        <div className="flex flex-row gap-10 mt-2 mb-10">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-14 text-lg font-bold shadow-xl transition-all duration-200"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 rounded-full px-14 text-lg font-bold transition-all duration-200"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </div>

      {/* Credit bawah */}
      <div className="absolute bottom-3 left-0 w-full text-center text-xs text-slate-400 opacity-70 z-20 select-none">
        Made with 💙 by Cashil Team &mdash; {new Date().getFullYear()}
      </div>

      {/* Animasi float */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-18px); }
          }
          .animate-float {
            animation: float 2.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
