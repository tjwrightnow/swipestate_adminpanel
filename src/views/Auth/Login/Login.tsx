"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginHandler } from "@/models/Auth/Auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { Login, isLoading } = useLoginHandler();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    Login({ identifier: email, password });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-secondary p-5">
      <div className="bg-white rounded-3xl p-10 w-full max-w-[440px] shadow-xl">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[100px] h-[100px] bg-secondary rounded-full flex justify-center items-center relative mb-4">
            <span className="text-5xl">🏠</span>
            <span className="absolute top-2.5 right-4 text-xl">❤️</span>
            <span className="absolute top-4 right-1 text-base">✨</span>
          </div>
          <h1 className="text-[28px] font-bold text-primary mb-2 tracking-wide">Swipe Estate</h1>
          <p className="text-[11px] text-textColor tracking-[1.5px] font-medium">WHERE DREAMS COME TRUE</p>
        </div>

        {/* Welcome Back */}
        <h2 className="text-2xl font-bold text-black text-center mb-8">Welcome Back!</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Email</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-lg z-10">📧</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3.5 px-4 pl-12 text-[15px] border border-gray-200 rounded-xl outline-none transition-all text-textColor focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-lg z-10">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3.5 px-4 pl-12 text-[15px] border border-gray-200 rounded-xl outline-none transition-all text-textColor focus:border-primary"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bg-transparent border-none cursor-pointer text-lg p-1">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="flex justify-end -mt-2">
            <Link href="/resetpassword" className="text-sm text-primary font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-primary text-white border-none rounded-xl py-4 text-base font-bold cursor-pointer transition-all mt-2.5 hover:bg-opacity-90 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
