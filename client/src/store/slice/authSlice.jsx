import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import auth from '../api/auth';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isError: false,
        errors: null,
        isLogin: false,
        users: null,
        userInfo: null,
    },
    reducers: {
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
            localStorage.removeItem('session');
            toast.success('logout success');
        },
    },
    extraReducers: (builder) => {
        // get all users
        builder.addCase(auth.allUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(auth.allUser.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.isLoading = false;
            state.users = data.data;
        });

        builder.addCase(auth.allUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});
export const { setAuth, logOut } = authSlice.actions;
export default authSlice.reducer;