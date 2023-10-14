import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import notificatiionSlice from './slice/notificatiionSlice';
import postSlice from './slice/postSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        notification: notificatiionSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'auth/allUser/fulfilled',
                    "postApi/getAllPost/fulfilled",
                    'authApi/userInfo/fulfilled',
                    'postApi/getAllScrollPost/fulfilled',
                    'notificationApi/getNotification/fulfilled',
                ],
            },
        }),
});
export default store;