"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChangePasswordHandler } from "@/models/Auth/Auth";

const NewPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
    identifier: "",
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = data;

  const handleFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  const router = useRouter();

  const { data: historyData } = history?.state || {};
  const { identifier, otp } = historyData || {};

  useEffect(() => {
    const ifEmailNotExist = identifier === "" || identifier === undefined || identifier === null;
    const ifOtpNotExist = otp === "" || otp === undefined || otp === null;
    if (ifOtpNotExist || ifEmailNotExist) {
      return router.push("/resetpassword");
    } else {
      setData((prev) => ({ ...prev, identifier, otp }));
    }
  }, []);

  const { ChangePasswordHandler, isLoading } = useChangePasswordHandler();

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    ChangePasswordHandler({ confirmPassword: confirmPassword, identifier: data.identifier, otp: data.otp, newPassword: password });
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

        {/* New Password Header */}
        <h2 className="text-2xl font-bold text-black text-center mb-3">Create New Password</h2>
        <p className="text-sm text-textColor text-center mb-8 leading-relaxed">Your new password must be different from previously used passwords</p>

        {/* New Password Form */}
        <form onSubmit={handleSetNewPassword} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">New Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-lg z-10">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={handleFields}
                className="w-full py-3.5 px-4 pl-12 text-[15px] border border-gray-200 rounded-xl outline-none transition-all text-textColor focus:border-primary"
                required
                // minLength={8}
                name="password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bg-transparent border-none cursor-pointer text-lg p-1">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Confirm Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-lg z-10">🔒</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleFields}
                className="w-full py-3.5 px-4 pl-12 text-[15px] border border-gray-200 rounded-xl outline-none transition-all text-textColor focus:border-primary"
                required
                // minLength={8}
                name="confirmPassword"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 bg-transparent border-none cursor-pointer text-lg p-1">
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="bg-secondary p-4 rounded-xl mt-1">
            <p className="text-[13px] font-semibold text-black mb-2.5">Password must contain:</p>
            <ul className="list-disc pl-5 m-0">
              <li className="text-xs text-textColor mb-1.5">At least 8 characters</li>
              <li className="text-xs text-textColor mb-1.5">One uppercase letter</li>
              <li className="text-xs text-textColor mb-1.5">One lowercase letter</li>
              <li className="text-xs text-textColor mb-1.5">One number</li>
            </ul>
          </div>

          <button type="submit" className="bg-primary text-white border-none rounded-xl py-4 text-base font-bold cursor-pointer transition-all mt-2.5 hover:bg-opacity-90 disabled:opacity-70" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

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

export default NewPassword;
