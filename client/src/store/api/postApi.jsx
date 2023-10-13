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
        .put(url.updatePost, data, config.basicHeader)
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

// get rating
postApi.getPostDetails = createAsyncThunk(`${name}getPostDetails`, async (id) => {
    const res = await axios.get(`${url.getPostDetails}/${id}`, config.simpleHeader);
    return res;
});

export default postApi;