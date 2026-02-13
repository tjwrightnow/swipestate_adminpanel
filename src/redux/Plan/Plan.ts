import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PlanResponse, RequestBuyPlan } from "./PlanTypes";

const Plan = createApi({
   reducerPath: "Plan",
   baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
   tagTypes: ["GetPlanAPI"],
   endpoints: (builder) => ({
      GetPlan: builder.query<PlanResponse, { interval?: string }>({
         query: ({ interval }) => ({
            url: `/api/plans/get-plans?search[interval]=${interval}`,
            method: "GET",
         }),
         providesTags: ["GetPlanAPI"],
      }),
      BuyPlan: builder.mutation<any, RequestBuyPlan>({
         query: (data) => ({
            url: `/api/subscriptions/create-subscription`,
            method: "POST",
            body: data,
         }),
      }),
   }),
});

export const { useGetPlanQuery, useBuyPlanMutation } = Plan;

export default Plan;
