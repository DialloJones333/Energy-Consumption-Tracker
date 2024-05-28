import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import Login from './pages/Login';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
