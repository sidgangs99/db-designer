import axios from 'axios';
import useAuthStore from '../store/firebase/state';

const authenticatedAxios = axios.create({
    baseURL: import.meta.env.DEV
        ? 'http://localhost:8000'
        : import.meta.env.VITE_BACKEND_API_URI
});
console.log(import.meta.env.DEV, import.meta.env.PROD);
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
