import axios from 'axios';
import config from '../config/config';
import url from '../config/url';

const reactionApi = {};
// create post reaction
reactionApi.postReaction = async (data) => {
    const res = await axios
        .post(url.postReaction, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// create comment reaction
reactionApi.commentReaction = async (data) => {
    const res = await axios
        .post(url.commentReaction, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

// create reply reaction
reactionApi.replytReaction = async (data) => {
    const res = await axios
        .post(url.replytReaction, data, config.basicHeader(config.accesstoken))
        .then((response) => response)
        .catch((err) => err.response);
    return res;
};

export default reactionApi;