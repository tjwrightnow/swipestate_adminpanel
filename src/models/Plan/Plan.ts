import { useBuyPlanMutation, useCreatePlanMutation, useGetPlanQuery } from "../../redux/Plan/Plan";
import { ShowErrorToast, ShowSuccessToast, ShowWarningToast } from "@/components/Toast/Toast";

// Create Plan
export const useCreatePlanHandler = () => {
   const [createPlanAPI, { isLoading }] = useCreatePlanMutation();

   const HandleCreatePlan = async (data: any) => {
      try {
         // console.log(data.title, data.type, data.description, "datadatadata")
         const { title, description, amount, planPoints, planRestrictions, appleProductId, type } = data
         console.log(title, description, amount, planPoints, planRestrictions, "datadatadata")
         if (title === "" || description === "") {
            return ShowWarningToast("Title And Description required");
         }

         if (amount > 0 && type === "user" && (appleProductId === "" || !appleProductId)) {
            return ShowWarningToast("Please Add Apple Product ID for paid subscriptions");
         }

         if (amount === "" || isNaN(Number(amount)) || Number(amount) < 0) {
            return ShowWarningToast("Please Enter A Valid Amount");
         }

         if (planPoints.length === 0) {
            return ShowWarningToast("Please Add Atleast 1 Point");
         }

         if (planPoints.length === 0) {
            return ShowWarningToast("Please Select Atleast 1 Restriction");
         }

         const res = await createPlanAPI({ data });
         console.log(res)
         if (!res.error) {
            ShowSuccessToast("Plan Added successfully");
         } else {
            ShowErrorToast("Something went wrong! Please try again later");
         }
      } catch (error) {
         ShowErrorToast("Something went wrong");
      }
   };

   return { HandleCreatePlan, isLoading };
};

// Get Plan
export const useGetPlanHandler = ({ interval, type }: { interval: string; type: string }) => {
   const GetPlan = useGetPlanQuery({ interval, type });
   const PlanData = GetPlan.data;
   console.log(PlanData)
   const PlanLoading = GetPlan.isLoading;
   const { isError, error, refetch, isFetching } = GetPlan;

   if (isError) {
      ShowErrorToast("Failed to fetch Plan");
   }

   return { PlanData, PlanLoading, isError, error, refetch, isFetching, GetPlan };
};
