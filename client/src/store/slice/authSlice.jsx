import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authApi from "../api/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isError: false,
    errors: null,
    isLogin: false,
    userId: null,
    users: null,
    userInfo: null,
  },
  reducers: {
    setUserId: (state, action) => {
      const { payload } = action;
      state.userId = payload;
    },
    setAuth: (state, action) => {
      const { payload } = action;
      state.userInfo = payload;
      state.isLoading = false;
      state.isLogin = true;
    },
    logOut: (state) => {
      state.userInfo = null;
      state.isLoading = false;
      state.isLogin = false;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    // get user information
    builder.addCase(authApi.userInfo.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(authApi.userInfo.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.isLoading = false;
      state.userInfo = data.user;
    });

    builder.addCase(authApi.userInfo.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // get all users
    builder.addCase(authApi.allUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(authApi.allUser.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.isLoading = false;
      state.users = data.data;
    });

    builder.addCase(authApi.allUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const { setUserId, setAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
