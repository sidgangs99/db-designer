import axios from 'axios';
import useAuthStore from '../store/firebase/state';
import { getEnvVariable } from './helper';

const authenticatedAxios = axios.create({
    baseURL: getEnvVariable('DEV')
        ? 'http://localhost:8000'
        : getEnvVariable('VITE_BACKEND_API_URI')
});

authenticatedAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { user }: any = useAuthStore.getState();
        const originalRequest = error.config;

        if (!user) window.location.href = window.location.origin;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshedToken = user.getIdToken(true);
                authenticatedAxios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${refreshedToken}`;

                return authenticatedAxios(originalRequest);
            } catch (err) {
                // handle token refresh failure
                console.error('Error refreshing access token:', err);
                throw err;
            }
        }

        throw error;
    }
);

export const authenticateGetAPI = (
    bearerToken: string,
    api: string,
    queryParam?: object
) =>
    authenticatedAxios.get(api, {
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
    authenticatedAxios.post(
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

export const authenticatePutAPI = async (
    bearerToken: string,
    api: string,
    payload: object
) =>
    authenticatedAxios.put(
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
