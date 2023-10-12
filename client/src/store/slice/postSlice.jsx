/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import recommend from '../api/recommend';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        isLoading: false,
        isError: false,
        recommends: null,
        perPage: 0,
        currentPage: 0,
        nextPage: null,
        isRatingLoading: false,
        isRatingError: false,
        ratings: 0,
    },
    extraReducers: (builder) => {
        // get all recommend / review
        builder.addCase(recommend.getAllRecommend.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(recommend.getAllRecommend.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.perPage = data.pagination.perPage;
            state.currentPage = data.pagination.currentPage;
            state.nextPage = data.pagination.nextPage;
            if (!state.recommends) {
                state.recommends = [];
                state.recommends.push(...data.data);
            } else {
                const newData = data.data.filter(
                    (item1) => !state.recommends.some((item) => item.id === item1.id)
                );
                state.recommends.push(...newData);
            }
            state.isLoading = false;
        });

        builder.addCase(recommend.getAllRecommend.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.nextPage = null; // Set nextPage to null when an error occurs
        });

        // get avarage rating
        builder.addCase(recommend.getAllRating.pending, (state) => {
            state.isRatingLoading = true;
        });

        builder.addCase(recommend.getAllRating.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.isRatingLoading = false;
            state.ratings = data.data.averageRating;
        });

        builder.addCase(recommend.getAllRating.rejected, (state) => {
            state.isRatingLoading = false;
            state.isRatingError = true;
        });
    },
});

export default postSlice.reducer;