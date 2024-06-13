import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username, password) => {
        try {
            const response = await api.post('/login/', { username, password });
            const { token, username, email, first_name, last_name } = response.data;
            localStorage.setItem('token', token);
            setUser({ username, email, first_name, last_name });
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