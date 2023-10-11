import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		themeData: null,
	},
	reducers: {
		setThemeData: (state, action) => {
			state.themeData = action.payload;
		},
	},
});

export const { setThemeData } = themeSlice.actions;
export default themeSlice.reducer;
