import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3010',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
