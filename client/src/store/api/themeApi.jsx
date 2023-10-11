import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0NTcxZGJkMC0yY2Q3LTExZWQtOTcxNy0wMDE1NWQyMTJjMDYiLCJzdG9yZV9pZCI6MTM5LCJvcmlnaW4iOiJib29rc2hvcC53ZWJtYW56YS5jb20iLCJkb21haW4iOiJib29rc2hvcC53ZWJtYW56YS5jb20iLCJzb3VyY2UiOiJib29rc2hvcC53ZWJtYW56YS5jb20iLCJ2ZXJzaW9uIjoiVjEuNS4wIiwiaWF0IjoxNjk0NzQ3OTYxLCJleHAiOjE2OTczMzk5NjF9.CwGeseGURPFmYlRf9INqLbHFBpbIQWryEEk1vQTWIII"
export const themeApi = createApi({
	reducerPath: "themeApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.webmanza.com/",
		prepareHeaders: (headers) => {
			headers.set("Origin", "bookshop.webmanza.com");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getThemeData: builder.query({
			query: () => "general/v2/store-info",
			method: "POST",
			// headers: {
			// 	Origin: "bookshop.webmanza.com",
			// 	Authorization: `Bearer ${token}`,
			// },
		}),
	}),
});

export const { useGetThemeDataQuery } = themeApi;
