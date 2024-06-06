import { Link, useLocation } from 'react-router-dom';

const TabBar = () => {
    const location = useLocation();

    return (
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
            <Link to="/profile" role="tab" className={`tab font-serif text-stone-400 ${location.pathname === '/profile' ? 'tab-active' : ''}`} aria-label="Profile">
                Profile
            </Link>
            <Link to="/dashboard" role="tab" className={`tab font-serif text-stone-400 ${location.pathname === '/dashboard' ? 'tab-active' : ''}`} aria-label="Dashboard">
                Account Preferences
            </Link>
        </div>
    );
}

export default TabBar;