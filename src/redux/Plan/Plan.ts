import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PlanResponse, RequestBuyPlan } from "./PlanTypes";

const Plan = createApi({
   reducerPath: "Plan",
   baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
   tagTypes: ["GetPlanAPI", "CreatePlan"],
   endpoints: (builder) => ({
      CreatePlan: builder.mutation<PlanResponse, { data?: any }>({
         query: ({ data }) => ({
            url: `/api/plans/create-plans`,
            method: "POST",
            body: data
         }),
         invalidatesTags: ["CreatePlan", "GetPlanAPI"],
      }),
      GetPlan: builder.query<PlanResponse, { interval?: string; type?: string }>({
         query: ({ interval, type }) => ({
            url: `/api/plans/get-plans?search[interval]=${interval}&search[type]=${type}`,
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

export const { useCreatePlanMutation, useGetPlanQuery, useBuyPlanMutation } = Plan;

export default Plan;
