import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.org/",
		// prepareHeaders: (headers) => {
		// 	headers.set("Origin", "bookshop.webmanza.com");
		// 	if (token) {
		// 		headers.set("Authorization", `Bearer ${token}`);
		// 	}
		// 	return headers;
		// },
	}),
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "posts",
			// headers: {
			// 	Origin: "bookshop.webmanza.com",
			// 	Authorization: `Bearer ${token}`,
			// },
		}),
	}),
});

export const { useGetPostsQuery } = postApi;
