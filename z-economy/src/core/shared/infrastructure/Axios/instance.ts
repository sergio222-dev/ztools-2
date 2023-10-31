import axios from 'axios';

let token;

const jwt = window.localStorage.getItem('sb-vglfdkapzwnkxsdehqsv-auth-token');

if (jwt) {
  try {
    const parsedToken = JSON.parse(jwt);
    token = parsedToken.access_token;
  } catch (error) {
    console.error('Error parsing JSON or accessing access_token:', error);
  }
} else {
  console.error('JWT token is null or undefined');
}

console.log(import.meta.env.VITE_API_URL);

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`,
  },
});
