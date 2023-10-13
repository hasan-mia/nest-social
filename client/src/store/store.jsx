import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import postSlice from './slice/postSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'auth/allUser/fulfilled',
                    "postApi/getAllPost/fulfilled",
                    'authApi/userInfo/fulfilled'
                ],
            },
        }),
});
export default store;