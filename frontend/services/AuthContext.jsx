import { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import api, { getUserData } from './api';

// React Context Object to manage the authentication state
const AuthContext = createContext();

// AuthProvider component to wrap the application and provide the authentication state
export const AuthProvider = ({ children }) => {
    // State to hold the user data
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // State to hold the notification preferences
    const [notificationPreferences, setNotificationPreferences] = useState(null);

    // Check if the user is authenticated when the application starts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/verify-token/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            // If the token is valid, get the user data and notification preferences
            .then(async () => {
                const userData = await getUserData();
                setIsAuthenticated(true);
                setUser(userData);

                const notificationResponse = await api.get('/notifications/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setNotificationPreferences(notificationResponse.data);
            })
            // If the token is invalid, remove it from the local storage
            .catch(() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
            });
        // If there is no token, set the authentication state to false
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    // Login function to authenticate the user
    const login = async (username, password) => {
        // Send a POST request to the login endpoint with the username and password
        try {
            const response = await api.post('/login/', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            const userData = await getUserData();
            setIsAuthenticated(true);
            setUser(userData);

            const notificationResponse = await api.get('/notifications/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setNotificationPreferences(notificationResponse.data);
        // If the login fails, set the authentication state to false
        } catch (error) {
            console.error('Login failed', error);
            setIsAuthenticated(false);
            throw error;
        }
    };

    // Logout function to de-authenticate the user
    const logout = async () => {
        // Send a POST request to the logout endpoint to remove the token/tokens
        try {
            await api.post('/logout/');
            localStorage.removeItem('token');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('authToken');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // Memoized value object to avoid re-rendering the context provider
    const value = useMemo(() => ({
        isAuthenticated,
        user,
        setUser,
        login,
        logout,
        notificationPreferences,
        setNotificationPreferences
    }), [isAuthenticated, user, notificationPreferences]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;