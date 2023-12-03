import axios from 'axios';

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosClient.interceptors.request.use(
  function (request) {
    const accessToken = store.getState().auth.token?.accessToken;
    if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
  },
  function (error) {
    return Promise.reject(error.response);
  }
);

export default axiosClient;
