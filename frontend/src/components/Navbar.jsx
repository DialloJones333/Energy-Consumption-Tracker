import { useLocation, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';
    const isDeviceManagement = location.pathname === '/device-management';
    const isCompareRates = location.pathname === '/compare-rates';
    const isTipsAndTricks = location.pathname === '/tips-and-tricks';
    
    const navigate = useNavigate();

    return (
        <div className="shadow-xl rounded-xl mx-4 my-2 p-4 bg-white">
            <div className="navbar bg-gray-100 shadow-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </button>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-md bg-gray-100 rounded-box w-52">
                            {!isDashboard && <li><button onClick={() => navigate('/dashboard')}>Dashboard</button></li>}
                            {!isDeviceManagement && <li><button onClick={() => navigate('/device-management')}>Device Management</button></li>}
                            {!isCompareRates && <li><button onClick={() => navigate('/compare-rates')}>Comparison Tool</button></li>}
                            {!isTipsAndTricks && <li><button onClick={() => navigate('/tips-and-tricks')}>Tips & Tricks</button></li>}
                            <li><a href="https://github.com/DialloJones333/Energy-Consumption-Tracker" target="_blank" rel="noopener noreferrer">About</a></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-end">
                        <button onClick={() => navigate('/')} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <span className="badge badge-xs bg-green-500 indicator-item"></span>
                            </div>
                        </button>
                </div>
                <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="images/tree_of_life_avatar_pic.jpeg" />
                        </div>
                    </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-100 rounded-box w-52">
                        <li>
                            <button onClick={() => navigate('/')} className="justify-between">
                                Profile <span className="badge">New</span>
                            </button>
                        </li>
                        <li><button onClick={() => navigate('/')}>Account Preferences</button></li>
                        <li><button onClick={() => navigate('/')}>Notifications</button></li>
                        <li><button onClick={() => navigate('/')}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;