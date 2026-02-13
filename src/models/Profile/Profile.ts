import { useDispatch } from "react-redux";
import { useGetProfileQuery, useUpdatePasswordMutation, useUpdateProfileMutation } from "../../redux/Profile/Profile";
import { ShowErrorToast, ShowSuccessToast, ShowWarningToast } from "@/components/Toast/Toast";
import { UserData } from "@/utils/Storage/Storage";

// Get Profile
export const useGetProfileHandler = () => {
   const userData = UserData;
   const userId = userData?._id;

   const Profile = useGetProfileQuery(userId, { skip: !userId });
   const ProfileData = Profile?.data?.user;
   const ProfileLoading = Profile.isLoading;
   const { isError, error, refetch } = Profile;

   if (isError) {
      ShowErrorToast("Failed to fetch Profile Details");
   }

   return { ProfileData, ProfileLoading, isError, error, refetch };
};

// Update Profile
export const useUpdateProfileHandler = () => {
   const [UpdateProfileAPI, { isLoading }] = useUpdateProfileMutation();
   const userData = UserData;
   const dispatch = useDispatch();

   const handleUpdateProfileAPI = async (data: any) => {
      try {
         const { name, email, address, profilePicture, creditScore, phone, selectedIncome } = data;
         console.log(data);
         if (!name || !email || !address || !profilePicture || !creditScore || !phone || !selectedIncome) {
            return ShowWarningToast("All Field Required");
         }
         const isImage = profilePicture?.split("/")?.includes("uploads");

         const formData = new FormData();
         console.log(formData);
         const proofImgType = profilePicture?.split(".");
         const imgType = proofImgType?.pop();
         const imageBlob = {
            uri: profilePicture,
            type: `image/${imgType}`,
            name: `profilePicture.${imgType}`,
         } as any;

         formData.append("profilePicture", isImage ? profilePicture : imageBlob);
         formData.append("address", address);
         formData.append("email", email);
         formData.append("name", name);
         formData.append("phone", phone);
         formData.append("selectedIncome", selectedIncome);
         formData.append("creditScore", creditScore);

         const res = await UpdateProfileAPI({
            userId: userData?._id,
            data: formData,
         });

         console.log(res, "UpdateProfileUpdateProfileUpdateProfile");

         if (!res.error) {
            // dispatch(authUser({ data: data }));
            return ShowSuccessToast((res as any)?.data?.message);
         }
      } catch (error) {
         console.error("Update Profile failed:", error);
         throw error;
      }
   };

   return { handleUpdateProfileAPI, isLoading };
};

// Update Profile
export const useUpdatePasswordHandler = () => {
   const [UpdatePasswordAPI, { isLoading }] = useUpdatePasswordMutation();
   const userData = UserData;

   const handleUpdatePasswordAPI = async ({ data }: { data: { previousPass: string; password: string; newPass: string } }) => {
      try {
         const { newPass, password, previousPass } = data;
         console.log({ newPass, password, previousPass });
         if (!newPass || !password) {
            return ShowWarningToast("All Field Required");
         }

         if (!previousPass) {
            return ShowWarningToast("Please enter your previous password");
         }

         if (newPass !== password) {
            return ShowWarningToast("New password and confirm password do not match");
         }

         const res = await UpdatePasswordAPI({
            userId: userData?._id,
            data: {
               password: previousPass,
               newPass: newPass,
            },
         });

         if (!res.error) {
            return ShowSuccessToast((res as any)?.data?.message);
         } else {
            return ShowErrorToast((res?.error as any)?.data?.message);
         }
      } catch (error) {
         console.error("Update Profile failed:", error);
         throw error;
      }
   };

   return { handleUpdatePasswordAPI, isLoading };
};
