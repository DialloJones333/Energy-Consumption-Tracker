import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

// PrivateRoute component to protect the private routes
const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    // If the user is authenticated, render the private route, otherwise redirect to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;