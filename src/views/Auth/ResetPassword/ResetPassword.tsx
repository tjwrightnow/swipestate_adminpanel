"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgotPassHandler } from "@/models/Auth/Auth";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { ForgotPassword, isLoading } = useForgotPassHandler();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    ForgotPassword({ identifier: email });

    // Add your reset password logic here
    console.log("Reset password for:", email);
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

        {/* Reset Password Header */}
        <h2 className="text-2xl font-bold text-black text-center mb-3">Reset Password</h2>
        <p className="text-sm text-textColor text-center mb-8 leading-relaxed">Enter your email address and we'll send you a code to reset your password</p>

        {/* Reset Password Form */}
        <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
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

          <button
            type="submit"
            className="bg-primary text-white border-none rounded-xl py-4 text-base font-bold cursor-pointer transition-all mt-2.5 hover:bg-opacity-90 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </button>

          <div className="text-center mt-5">
            <span className="text-sm text-textColor">Remember your password? </span>
            <Link href="/login" className="text-sm text-primary font-semibold hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
