import axios from 'axios';

// Create an Axios instance with a base URL for API calls
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Change this to my server's URL before deployed
});

// Add a request interceptor to include the authentication token in headers
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error) // Handle request error
);

export default api;