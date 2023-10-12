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
			}),
		}),
	}),
});

export const { useGetAccessTokenMutation } = authApi;
