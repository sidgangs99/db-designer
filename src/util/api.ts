import axios from 'axios';

export const authenticateGetAPI = (
    bearerToken: string,
    api: string,
    queryParam?: object
) =>
    axios.get(api, {
        params: queryParam,
        headers: {
            Authorization: 'Bearer ' + bearerToken
        }
    });

export const authenticatePostAPI = (
    bearerToken: string,
    api: string,
    payload: object,
    queryParam?: object
) =>
    axios.post(
        api,
        {
            ...payload
        },
        {
            params: queryParam,
            headers: {
                Authorization: 'Bearer ' + bearerToken
            }
        }
    );

export const authenticatePutAPI = (
    bearerToken: string,
    api: string,
    payload: object
) => {
    return axios.put(
        api,
        {
            ...payload
        },
        {
            headers: {
                Authorization: 'Bearer ' + bearerToken
            }
        }
    );
};
