import { useBuyPlanMutation, useGetPlanQuery } from "../../redux/Plan/Plan";
import { ShowErrorToast } from "@/components/Toast/Toast";

// Get Plan
export const useGetPlanHandler = ({ interval }: { interval: string }) => {
   const GetPlan = useGetPlanQuery({ interval });
   const PlanData = GetPlan.data;
   const PlanLoading = GetPlan.isLoading;
   const { isError, error, refetch, isFetching } = GetPlan;

   if (isError) {
      ShowErrorToast("Failed to fetch Plan");
   }

   return { PlanData, PlanLoading, isError, error, refetch, isFetching, GetPlan };
};
