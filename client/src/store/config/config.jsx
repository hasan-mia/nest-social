import Cookies from "js-cookie";

const config = {};
config.baseUrl = process.env.REACT_APP_BASE_URL;
config.accesstoken = Cookies.get('token');

config.simpleHeader = {
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};
config.basicHeader = {
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
         Authorization: `${config.accesstoken}`,
    },
};
config.paramsWithHeader = (param) => {
    const params = {
        params: param,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${config.accesstoken}`,
        },
    };
    return params;
};
config.payloadWithHeader = (payload) => {
    const params = {
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `${config.accesstoken}`,
        },
        data: JSON.stringify(payload),
    };
    return params;
};

export default config;