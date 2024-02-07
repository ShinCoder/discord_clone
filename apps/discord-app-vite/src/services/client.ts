import axios from 'axios';
import { Mutex } from 'async-mutex';

import { IRefreshResult } from '@prj/types/api';
import { clearAuthState, setToken } from '@redux/slices/authSlice';

let store: any;

const mutex = new Mutex();

export const injectStore = (_store: any) => {
  store = _store;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL
});

const apiClientWithAuth = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL
});

apiClientWithAuth.interceptors.request.use(
  async (request) => {
    await mutex.waitForUnlock();

    const accessToken = store.getState().auth.token?.accessToken;
    if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
  },
  async (error) => {
    return Promise.reject(error.response);
  }
);

apiClientWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const release = await mutex.acquire();
      try {
        const refresh = await apiClient.put<IRefreshResult>('auth/refresh', {
          refreshToken: store.getState().auth.token?.refreshToken
        });

        const token = refresh.data;

        store.dispatch(setToken(token));

        return apiClientWithAuth.request(error.config);
      } catch (error: any) {
        store.dispatch(clearAuthState());
        return Promise.reject(error.response);
      } finally {
        release();
      }
    } else return Promise.reject(error.response);
  }
);

export { apiClient, apiClientWithAuth };
