import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config/config';
import url from '../config/url';

const name = 'postApi/';
const postApi = {};
// create post
postApi.createPost = async (data) => {
    const res = await axios
        .post(url.createPost, data, config.fileHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};
// update post
postApi.updatePost = async (data) => {
    const res = await axios
        .put(url.updatePost, data, config.fileHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};
// delete post
postApi.deletePost = async (payload, id) => {
    const res = await axios
        .delete(`${url.deletePost}/${id}`, config.basicHeader)
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};
// get all post
postApi.getAllPost = createAsyncThunk(`${name}getAllPost`, async (path) => {
    const res = await axios.get(path, config.simpleHeader);
    return res;
});

// get scoll post
postApi.getAllScrollPost = createAsyncThunk(`${name}getAllScrollPost`, async (path) => {
    const res = await axios.get(path, config.simpleHeader);
    return res;
});

// get post details
postApi.getPostDetails = createAsyncThunk(`${name}getPostDetails`, async (id) => {
    const res = await axios.get(`${url.getPostDetails}/${id}`, config.simpleHeader);
    return res;
});

// create comment
postApi.createComment = async (data) => {
    const res = await axios
        .post(url.createComment, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// update comment
postApi.updateComment = async (data) => {
    const res = await axios
        .put(url.updateComment, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// delete comment
postApi.deleteComment = async (data) => {
    const res = await axios
        .delete(url.deleteComment, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// create reply
postApi.createReply = async (data) => {
    const res = await axios
        .post(url.createReply, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// update reply
postApi.updateReply = async (data) => {
    const res = await axios
        .put(url.updateReply, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// delete reply
postApi.deleteReply = async (data) => {
    const res = await axios
        .delete(url.deleteReply, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};


export default postApi;