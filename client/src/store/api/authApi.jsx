import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config/config';
import url from '../config/url';

const name = 'authApi/';
const authApi = {};

// signup
authApi.signupUser = async (data) => {
    const res = await axios
        .post(url.signUp, data, config.simpleHeader)
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// signin
authApi.signinUser = async (data) => {
    const res = await axios
        .post(url.signIn, data, config.simpleHeader)
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// signout
authApi.signinOut = async (data) => {
    const res = await axios
        .post(url.signinOut, data, config.simpleHeader)
        .then((response) => response)
        .catch((err) => err.response);
    return res;
}

// update password
authApi.updatePass = async (data) => {
    const res = await axios
        .post(url.signinOut, data, config.simpleHeader)
        .then((response) => response)
        .catch((err) => err.response);
    return res;
}

// single user information
authApi.userInfo = createAsyncThunk(`${name}userInfo`, async () => {
    const res = await axios.get(url.userInfo, config.basicHeader);
    return res;
});

// all user
authApi.allUser = createAsyncThunk(`${name}allUser`, async () => {
    const res = await axios.get(url.allUser, config.basicHeader);
    return res;
});

export default authApi;