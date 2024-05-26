import { Link } from 'react-router-dom';

const LandingNavbar = () => (
    <nav className="flex items-center justify-between p-5 bg-gray-100 shadow-md">
        <div className="logo">
            <img src="/assets/images/Energy_Consumpt_Logo.png" alt="EcoEfficient Living Logo" className="h-10" />
        </div>
        <div className="nav-links flex space-x-5">
            <Link to="/signup" className="text-gray-700 font-bold hover:text-green-500">Signup</Link>
            <Link to="/login" className="text-gray-700 font-bold hover:text-green-500">Login</Link>
        </div>
    </nav>
);

export default LandingNavbar;