import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.log(error)
    return error;
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    return error;
  }
);
