const config = {};
config.baseUrl = process.env.REACT_APP_BASE_URL;
config.accesstoken = process.env.REACT_APP_ACCESS_TOKEN_SECRET;

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
        Authorization: `Bearer ${config.accesstoken}`,
    },
};
config.paramsWithHeader = (param) => {
    const params = {
        params: param,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.accesstoken}`,
        },
    };
    return params;
};
config.payloadWithHeader = (payload) => {
    const params = {
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${config.accesstoken}`,
        },
        data: JSON.stringify(payload),
    };
    return params;
};

export default config;