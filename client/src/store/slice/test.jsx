/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import community from '../api/community';

const CommunitySlice = createSlice({
    name: 'community',
    initialState: {
        isLoading: false,
        error: false,
        communities: [],
        total: 0,
        perpage: 0,
        currentpage: 0,
        previousPage: null,
        nextPage: null,
        scrollLoading: false,
        scrollError: false,
    },
    reducers: {
        updateComment: (state, action) => {
            const { feedId, data } = action.payload;
            const existItem = state.communities.filter((item) => item.uuid === feedId);
            existItem[0].comments = data;
        },

        addLike: (state, action) => {
            const { uuid, data } = action.payload;
            const exitsPost = state.communities.filter((item) => item.uuid === uuid);
            if (exitsPost.length > 0) {
                if (data !== '' || data === null || data !== ' ') {
                    if (exitsPost[0].likes) {
                        exitsPost[0].likes.users = data;
                    } else {
                        exitsPost[0].likes = {
                            users: data,
                        };
                    }
                } else {
                    exitsPost[0].likes = null;
                }
            }
        },

        addCommentLike: (state, action) => {
            const { uuid, commentId, data } = action.payload;
            const exitsPost = state.communities.filter((item) => item.uuid === uuid);
            if (exitsPost.length > 0) {
                const exitsComment = exitsPost[0].comments.filter(
                    (item) => item.uuid === commentId
                );
                if (data !== '' || data === null || data !== ' ') {
                    if (exitsComment[0].likes) {
                        exitsComment[0].likes.users = data;
                    } else {
                        exitsComment[0].likes = {
                            users: data,
                        };
                    }
                } else {
                    exitsComment[0].likes = null;
                }
            }
        },
        addReplyLike: (state, action) => {
            const { uuid, commentId, replyId, data } = action.payload;
            const exitsPost = state.communities.filter((item) => item.uuid === uuid);
            if (exitsPost.length > 0) {
                const exitsComment = exitsPost[0].comments.filter(
                    (item) => item.uuid === commentId
                );
                const exitsReply = exitsComment[0].reply.filter((item) => item.uuid === replyId);
                if (exitsReply.length > 0) {
                    if (data !== '' || data === null || data !== ' ') {
                        if (exitsReply[0].likes) {
                            exitsReply[0].likes.users = data;
                        } else {
                            exitsReply[0].likes = {
                                users: data,
                            };
                        }
                    } else {
                        exitsReply[0].likes = null;
                    }
                }
            }
        },
        userCommunity: (state, action) => {
            const data = action.payload;
            state.communities = data;
        },
        emptyCommunity: (state, action) => {
            state.communities = [];
        },
    },

    extraReducers: (builder) => {
        // get all communities
        builder.addCase(community.getAllCommunity.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        });
        builder.addCase(community.getAllCommunity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            const { data } = action.payload;
            state.communities = data.data;
            state.currentPage = data.current_page;
            state.previousPage = data.prev_page_url;
            state.nextPage = data.next_page_url;
            state.total = data.total;
            state.perpage = data.per_page;
        });
        builder.addCase(community.getAllCommunity.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        });
        // get all communities on scroll
        builder.addCase(community.onScrollCummunity.pending, (state) => {
            state.scrollLoading = true;
            state.scrollError = false;
        });
        builder.addCase(community.onScrollCummunity.fulfilled, (state, action) => {
            state.scrollLoading = false;
            state.scrollError = false;
            const { data } = action.payload;
            state.currentPage = data.current_page;
            state.previousPage = data.prev_page_url;
            state.nextPage = data.next_page_url;
            state.total = data.total;
            state.perpage = data.per_page;
            if (!state.communities || state.communities.length <= 0) {
                state.communities = [];
                state.communities.push(...data.data);
            } else {
                const newData = data.data.filter(
                    (item1) => !state.communities.some((item) => item.uuid === item1.uuid)
                );
                state.communities.push(...newData);
            }
        });
        builder.addCase(community.onScrollCummunity.rejected, (state) => {
            state.scrollLoading = false;
            state.scrollError = true;
        });
    },
});
export const {
    updateComment,
    addLike,
    addCommentLike,
    addReplyLike,
    userCommunity,
    emptyCommunity,
} = CommunitySlice.actions;
export default CommunitySlice.reducer;