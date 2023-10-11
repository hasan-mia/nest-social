import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { postApi } from "./api/postApi";
import { themeApi } from "./api/themeApi";
import authSlice from "./slice/authSlice";
import postSlice from "./slice/postSlice";
import themeSlice from "./slice/themeSlice";

export const store = configureStore({
	reducer: {
		post: postSlice,
		auth: authSlice,
		theme: themeSlice,
		[postApi.reducerPath]: postApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[themeApi.reducerPath]: themeApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(themeApi.middleware)
			.concat(authApi.middleware)
			.concat(postApi.middleware),
});

setupListeners(store.dispatch);
