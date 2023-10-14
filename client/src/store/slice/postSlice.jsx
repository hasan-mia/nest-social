/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import postApi from "../api/postApi";

const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    isError: false,
    posts: [],
    perPage: 0,
    currentPage: 0,
    nextPageUrl: null,
    nextPage: 0,
    // single post
    post: null,
  },
  reducers: {
    updateComment: (state, action) => {
      const { postId, data } = action.payload;
      const existItem = state.posts.filter((item) => item.id === postId);
      existItem[0].comments = data;
    },
    addReaction: (state, action) => {
      const { postId, data } = action.payload;
      const exitsPost = state.posts.filter((item) => item.id === postId);
      if (exitsPost.length > 0) {
        if (data !== "" || data === null || data !== " ") {
          if (exitsPost[0].reactions) {
            exitsPost[0].reactions = data;
          } else {
            exitsPost[0].reactions = {
              reactions: data,
            };
          }
        } else {
          exitsPost[0].reactions = null;
        }
      }
    },
    addCommetReaction: (state, action) => {
      const { postId, commentId, data } = action.payload;
      const exitsPost = state.posts.filter((item) => item.id === postId);
      if (exitsPost.length > 0) {
        const exitsComment = exitsPost[0].comments.filter(
          (item) => item.id === commentId,
        );
        if (data !== "" || data === null || data !== " ") {
          if (exitsComment[0].reactions) {
            exitsComment[0].reactions = data;
          } else {
            exitsComment[0].reactions = {
              reactions: data,
            };
          }
        } else {
          exitsComment[0].reactions = null;
        }
      }
    },
    addReplyReaction: (state, action) => {
      const { postId, commentId, replyId, data } = action.payload;
      const exitsPost = state.posts.filter((item) => item.id === postId);
      if (exitsPost.length > 0) {
        const exitsComment = exitsPost[0].comments.filter(
          (item) => item.id === commentId,
        );
        const exitsReply = exitsComment[0].replies.filter(
          (item) => item.id === replyId,
        );
        if (exitsReply.length > 0) {
          if (data !== "" || data === null || data !== " ") {
            if (exitsReply[0].reactions) {
              exitsReply[0].reactions = data;
            } else {
              exitsReply[0].reactions = {
                reactions: data,
              };
            }
          } else {
            exitsReply[0].reactions = null;
          }
        }
      }
    },
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
      state.nextPageUrl = data.nextPageUrl;
      state.isLoading = true;
      if (state.posts.length <= 0) {
        state.posts.push(...data.data);
      } else {
        const newData = data.data.filter(
          (item1) => !state.posts.some((item) => item.id === item1.id),
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

export const { addReaction, addCommetReaction, addReplyReaction, updateComment } =
  postSlice.actions;
export default postSlice.reducer;
