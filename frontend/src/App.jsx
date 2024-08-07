import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../services/PrivateRoute';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DeviceManagement from './pages/DeviceManagement';
import RemoveDevices from './pages/RemoveDevices';
import FilterData from './pages/FilterData';
import TipsAndTricks from './pages/TipsAndTricks';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import AccountPreferences from './pages/AccountPreferences';
import Notifications from './pages/Notifications';
import { AuthProvider } from '../services/AuthContext';

// Main application component
function App() {
  return (
    // Wrap the entire application with the AuthProvider
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/device-management" element={<DeviceManagement />} />
            <Route path="/remove-devices" element={<RemoveDevices />} />
            <Route path="/filter-consumption" element={<FilterData />} />
            <Route path="/tips-and-tricks" element={<TipsAndTricks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/account-preferences" element={<AccountPreferences />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;