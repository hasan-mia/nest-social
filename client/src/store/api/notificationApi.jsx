import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config/config';
import url from '../config/url';

const name = 'notificationApi/';
const notificationApi = {};

// create post
notificationApi.createNotification = async (data) => {
    const res = await axios
        .post(url.createNotification, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};
// update post
notificationApi.readNotification = async (data) => {
    const res = await axios
        .put(url.readNotification, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// get all post
notificationApi.getNotification = createAsyncThunk(`${name}getNotification`, async () => {
    const res = await axios.get(url.getNotification, config.basicHeader(config.accesstoken));
    return res;
});

export default notificationApi;