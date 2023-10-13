/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import postApi from '../api/postApi';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        isLoading: false,
        isError: false,
        posts: [],
        perPage: 0,
        currentPage: 0,
        nextPage: 0,
        nextPageUrl: null,
        // single post
        post: null,
    },
    extraReducers: (builder) => {
        // get all post
        builder.addCase(postApi.getAllPost.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(postApi.getAllPost.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.perPage = data.perPage;
            state.currentPage = data.currentPage;
            state.nextPage = data.nextPage;
            state.nextPageUrl =  data.nextPageUrl
            if (!state.posts) {
                state.posts = [];
                state.posts.push(...data.data);
            } else {
                const newData = data.data.filter(
                    (item1) => !state.posts.some((item) => item.id === item1.id)
                );
                state.posts.push(...newData);
            }
            state.isLoading = false;
        });

        builder.addCase(postApi.getAllPost.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.nextPage = null; 
        });

        // get single post
        builder.addCase(postApi.getPostDetails.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(postApi.getPostDetails.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.isLoading = false;
            state.post = data.data;
        });

        builder.addCase(postApi.getPostDetails.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export default postSlice.reducer;