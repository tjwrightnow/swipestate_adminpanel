import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const Users = createApi({
	reducerPath: "Users",
	baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API}),
	endpoints: (builder) => ({
		GetBuyers: builder.query<any, {page: number}>({
			query: ({page}) => ({
				url: `/api/get-buyers?page=${page}&limit=6`,
				method: "GET",
			}),
		}),
		GetSellers: builder.query<any, {page: number}>({
			query: ({page}) => ({
				url: `/api/get-sellers?page=${page}&limit=6`,
				method: "GET",
			}),
		}),
	}),
});

export const {useGetBuyersQuery, useGetSellersQuery} = Users;

export default Users;
