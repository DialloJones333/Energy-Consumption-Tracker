import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DeviceManagement from './pages/DeviceManagement';
import CompareRates from './pages/CompareRates';
import TipsAndTricks from './pages/TipsAndTricks';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword'
import AccountPreferences from './pages/AccountPreferences';
import Notifications from './pages/Notifications';


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/device-management' element={<DeviceManagement />} />
        <Route path='/compare-rates' element={<CompareRates />} />
        <Route path='/tips-and-tricks' element={<TipsAndTricks />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/account-preferences' element={<AccountPreferences />} />
        <Route path='/notifications' element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App
