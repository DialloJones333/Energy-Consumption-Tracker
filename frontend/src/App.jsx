import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DeviceManagement from './pages/DeviceManagement';
import CompareRates from './pages/CompareRates';
import TipsAndTricks from './pages/TipsAndTricks';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/device-management' element={<DeviceManagement />} />
        <Route path='/compare-rates' element={<CompareRates />} />
        <Route path='/tips-and-tricks' element={<TipsAndTricks />} />
      </Routes>
    </Router>
  );
}

export default App
