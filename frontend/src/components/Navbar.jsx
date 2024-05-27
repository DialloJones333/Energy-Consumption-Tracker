import { Link, useLocation } from 'react-router-dom';

const LandingNavbar = () => {
    const location = useLocation();

    return (
        <nav className="flex items-center justify-between p-5 bg-gray-100 shadow-md">
            <div className="logo">
                <img src="/assets/images/Energy_Consumpt_Logo.png" alt="EcoEfficient Living Logo" className="h-10" />
            </div>
            <div className="nav-links flex space-x-5">
                {location.pathname === '/' && (
                    <>
                        <Link to="/signup" className="text-gray-700 font-bold hover:text-green-500">Signup</Link>
                        <Link to="/login" className="text-gray-700 font-bold hover:text-green-500">Login</Link>
                    </>
                )}
                {location.pathname === '/signup' && (
                    <Link to="/login" className="text-gray-700 font-bold hover:text-green-500">Login</Link>
                )}
                {location.pathname === '/login' && (
                    <Link to="/" className="text-gray-700 font-bold hover:text-green-500">Signup</Link>
                )}
            </div>
        </nav>
    );
};

export default LandingNavbar;