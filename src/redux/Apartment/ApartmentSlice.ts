import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApartmentType } from "./ApartmentType";

const Apartment = createApi({
   reducerPath: "Apartment",
   baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
   tagTypes: ["updateApartments"],
   endpoints: (builder) => ({
      GetApartments: builder.query<ApartmentType, { page: number }>({
         query: ({ page }) => ({
            url: `/api/apartments/property-listing?page=${page}&limit=6`,
            method: "GET",
         }),
         providesTags: ["updateApartments"],
      }),
      UpdateApartments: builder.mutation<ApartmentType, { propertyId: string; sellerId: string; data: { status: string } }>({
         query: ({ sellerId, propertyId, data }) => ({
            url: `/api/apartments/${sellerId}/update-property/${propertyId}`,
            method: "PATCH",
            body: data,
         }),
         invalidatesTags: ["updateApartments"],
      }),
   }),
});

export const { useGetApartmentsQuery, useUpdateApartmentsMutation } = Apartment;

export default Apartment;
