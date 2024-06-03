import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DeviceManagement from './pages/DeviceManagement';
import CompareRates from './pages/CompareRates';


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
      </Routes>
    </Router>
  );
}

export default App
