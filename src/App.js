import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login";
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;