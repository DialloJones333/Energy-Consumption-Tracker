import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log('LandingPage rendered with pathname:', location.pathname);

    return (
        <nav className="flex items-center justify-between p-5 bg-gray-100 shadow-md">
            <div className="logo">
                <img src="images/Energy_Consumpt_Logo.png" alt="EcoEfficient Living Logo" className="h-16 w-16" />
            </div>
            <div className="nav-links flex space-x-5">
                {location.pathname === '/' && (
                    <div className=' space-x-5'>
                        <button 
                            className="btn btn-outline border-slate-800 hover:bg-green-500 text-gray-700 font-bold" 
                            type='button'
                            onClick={() => navigate('/login')}>
                            Log In
                        </button>
                        <button 
                            className="btn btn-outline border-slate-800 hover:bg-green-500 text-gray-700 font-bold" 
                            type='button'
                            onClick={() => navigate('/signup')}>
                            Sign Up
                        </button>
                    </div>
                )}
                {location.pathname === '/signup' && (
                    <div className="space-x-5">
                        <button
                            className="btn btn-outline border-slate-800 hover:bg-green-500 text-gray-700 font-bold" 
                            type='button'
                            onClick={() => navigate('/')}>
                            Home
                        </button>
                        <button 
                            className="btn btn-outline border-slate-800 hover:bg-green-500 text-gray-700 font-bold" 
                            type='button'
                            onClick={() => navigate('/login')}>
                            Log In
                        </button>
                    </div>
                )}
                {location.pathname === '/login' && (
                    <div className="space-x-5">
                        <button
                            className="btn btn-outline border-slate-800 hover:bg-green-500 text-gray-700 font-bold" 
                            type='button'
                            onClick={() => navigate('/')}>
                            Home
                        </button>
                        <button 
                            className="btn btn-outline border-slate-800 hover:bg-green-500 text-gray-700 font-bold" 
                            type='button'
                            onClick={() => navigate('/signup')}>
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;