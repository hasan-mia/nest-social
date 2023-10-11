import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.webmanza.com/",
		prepareHeaders: (headers) => {
			headers.set("Origin", "bookshop.webmanza.com");
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getAccessToken: builder.mutation({
			query: () => ({
				url: "/auth/v2/get-access-token",
				method: "POST",
				// headers: {
				// 	Origin: "bookshop.webmanza.com",
				// },
			}),
		}),
		// getAccessToken: builder.query({
		// 	query: () => "auth/v2/get-access-token",
		// 	method: "GET",
		// 	// headers: {
		// 	// 	Origin: "bookshop.webmanza.com",
		// 	// },
		// }),
	}),
});

export const { useGetAccessTokenMutation } = authApi;
