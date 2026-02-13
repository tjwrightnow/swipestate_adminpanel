"use client";

import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useVerifyOTPHandler } from "@/models/Auth/Auth";

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState("");

  const router = useRouter();

  const { data } = history?.state || {};

  useEffect(() => {
    if (data === "" || data === undefined || data === null) {
      return router.push("/resetpassword");
    } else {
      setEmail(data?.identifier);
    }
  }, []);

  console.log(email);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const { VerifyOTPHandler, isLoading } = useVerifyOTPHandler();

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      alert("Please enter the complete OTP");
      return;
    }

    VerifyOTPHandler({ identifier: email, otp: otpCode });
  };

  const handleResendCode = () => {
    console.log("Resend OTP");
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
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

        {/* Verify OTP Header */}
        <h2 className="text-2xl font-bold text-black text-center mb-3">Verify Code</h2>
        <p className="text-sm text-textColor text-center mb-8 leading-relaxed">Please enter the 4-digit code sent to your email</p>

        {/* OTP Form */}
        <form onSubmit={handleVerifyOTP} className="flex flex-col gap-6">
          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12.5 h-12.5 text-sm font-bold text-center border-2 border-gray-200 rounded-xl outline-none transition-all text-textColor focus:border-primary"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-primary text-white border-none rounded-xl py-4 text-base font-bold cursor-pointer transition-all mt-2.5 hover:bg-opacity-90 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>

          <div className="text-center">
            <span className="text-sm text-textColor">Didn't receive the code? </span>
            <button type="button" onClick={handleResendCode} className="text-sm text-primary bg-transparent border-none cursor-pointer font-semibold p-0 hover:underline">
              Resend
            </button>
          </div>

          <div className="text-center mt-2.5">
            <Link href="/login" className="text-sm text-primary font-semibold hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
