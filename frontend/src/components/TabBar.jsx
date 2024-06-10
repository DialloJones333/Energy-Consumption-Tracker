import { Link, useLocation } from 'react-router-dom';

const TabBar = () => {
    const location = useLocation();

    return (
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
            <Link to="/profile" role="tab" className={`tab font-serif text-stone-400 ${location.pathname === '/profile' ? 'tab-active' : ''}`} aria-label="Profile">
                Profile
            </Link>
            <Link to="/account-preferences" role="tab" className={`tab font-serif text-stone-400 ${location.pathname === '/account-preferences' ? 'tab-active' : ''}`} aria-label="Account Preferences">
                Account Preferences
            </Link>
        </div>
    );
}

export default TabBar;