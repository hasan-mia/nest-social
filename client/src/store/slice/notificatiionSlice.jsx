import { createSlice } from "@reduxjs/toolkit";
import notificationApi from "../api/notificationApi";

const notificatiionSlice = createSlice({
  name: "notification",
  initialState: {
    isLoading: false,
    isError: false,
    notifications: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // get user notification
    builder.addCase(notificationApi.getNotification.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(notificationApi.getNotification.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.isLoading = false;
      state.notifications = data;
    });

    builder.addCase(notificationApi.getNotification.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const {} = notificatiionSlice.actions;
export default notificatiionSlice.reducer;
