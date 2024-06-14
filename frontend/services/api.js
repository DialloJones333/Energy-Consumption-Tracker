import axios from 'axios';

// Function to get the value of a cookie
function getCookie(name) {
    // Split the cookie string by semicolons
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        // Iterate through the cookies and find the cookie with the name
        for (const cookie of cookies) {
            const trimmedCookie = cookie.trim();
            // Check if this cookie is the one we are looking for by checking if it starts with the name
            if (trimmedCookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(trimmedCookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Function to get the user data
export const getUserData = async () => {
    // Send a GET request to the current-user endpoint
    try {
        const response = await api.get('/current-user/');
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

// Create an axios instance
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Add a request interceptor to set the CSRF token and the Authorization header
api.interceptors.request.use((config) => {
    // Get the token from the local storage
    const token = localStorage.getItem('token');
    // If the token exists, set the Authorization header
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    // Get the CSRF token from the cookie
    const csrfToken = getCookie('csrftoken');
    // If the CSRF token exists, set the X-CSRFToken header
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;