import { useContext } from 'react';
import AuthContext from './AuthContext';

// Custom hook to use the authentication context
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;