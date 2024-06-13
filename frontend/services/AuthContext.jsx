import { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await api.post('/login/', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setUser({
                username: response.data.username,
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
            });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed', error);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout/');
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const value = useMemo(() => ({
        isAuthenticated,
        user,
        login,
        logout,
    }), [isAuthenticated, user]);

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