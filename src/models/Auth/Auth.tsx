"use client";

import { ShowErrorToast, ShowSuccessToast, ShowWarningToast } from "@/components/Toast/Toast";
import { useForgotPasswordMutation, useLoginAccointMutation, useLogoutMutation, useNewpasswordMutation, useVerifyOtpMutation } from "@/redux/Auth/AuthSlice";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useLoginHandler = () => {
   const [login, { isLoading }] = useLoginAccointMutation();
   const router = useRouter();

   const Login = async (data: { identifier: string; password: string }) => {
      try {
         if (data?.identifier === "" || data?.password === "") {
            return ShowWarningToast("All fields required");
         }

         const res = await login(data);

         if (!res.error) {
            ShowSuccessToast("Logged in successfully");

            const encoded = encodeURIComponent(JSON.stringify(res));

            document.cookie = `swipeestate=${encoded}; path=/;`;

            window.location.replace("/buyers");
         } else {
            ShowErrorToast((res?.error as any)?.data?.message);
         }
      } catch (error) {
         ShowErrorToast("Something went wrong");
      }
   };

   return { Login, isLoading };
};

export const useForgotPassHandler = () => {
   const [forgotpass, { isLoading }] = useForgotPasswordMutation();
   const router = useRouter();

   const ForgotPassword = async (data: { identifier: string }) => {
      try {
         if (data?.identifier === "") {
            return ShowWarningToast("All fields required");
         }

         const res = await forgotpass(data);

         if (!res.error) {
            history?.pushState({ data: data }, "", "/verifyotp");
            router.push("/verifyotp");
         } else {
            ShowErrorToast((res?.error as any)?.data?.message);
         }
      } catch (error) {
         ShowErrorToast("Something went wrong");
      }
   };

   return { ForgotPassword, isLoading };
};

export const useVerifyOTPHandler = () => {
   const [VerifyOtp, { isLoading }] = useVerifyOtpMutation();
   const router = useRouter();

   const VerifyOTPHandler = async (data: { identifier: string; otp: string }) => {
      try {
         if (data?.identifier === "" || data?.otp === "") {
            return ShowWarningToast("Please Enter OTP");
         }

         const res = await VerifyOtp(data);

         console.log(res);

         if (!res.error) {
            history?.pushState({ data: data }, "", "/newpassword");
            router.push("/newpassword");
         } else {
            ShowErrorToast((res?.error as any)?.data?.message);
         }
      } catch (error) {
         ShowErrorToast("Something went wrong");
      }
   };

   return { VerifyOTPHandler, isLoading };
};
export const useChangePasswordHandler = () => {
   const [ChangePassword, { isLoading }] = useNewpasswordMutation();
   const router = useRouter();

   const ChangePasswordHandler = async (data: { identifier: string; otp: string; newPassword: string; confirmPassword: string }) => {
      try {
         const { identifier, newPassword, otp, confirmPassword } = data;

         if (newPassword !== confirmPassword) {
            return ShowWarningToast("Password must be same");
         }

         const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{1,}$/;

         if (!regex.test(newPassword)) {
            return ShowErrorToast("Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.");
         }

         const res = await ChangePassword({
            identifier,
            newPassword,
            otp,
         });

         if (!res.error) {
            router.push("/login");
            ShowSuccessToast("Password Updated Successfully");
         } else {
            ShowErrorToast((res?.error as any)?.data?.message);
         }
      } catch (error) {
         ShowErrorToast("Something went wrong");
      }
   };

   return { ChangePasswordHandler, isLoading };
};

export const useLogoutHandler = () => {
   const [logoutAPI] = useLogoutMutation();
   const router = useRouter();

   const Logout = async (token: string) => {
      try {
         const res = await logoutAPI({ token });

         deleteCookie("swipeestate");
         router.push("/login");
         document.cookie = "swipeestate; Max-Age=0; path=/";
         window.location.replace("/login");
      } catch (error) {
         ShowErrorToast("Something went wrong");
      }
   };

   return { Logout };
};
