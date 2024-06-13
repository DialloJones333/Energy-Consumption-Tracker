import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username, password) => {
        try {
            const response = await api.post('/login/', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
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
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const value = useMemo(() => ({
        isAuthenticated,
        login,
        logout,
    }), [isAuthenticated]);

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