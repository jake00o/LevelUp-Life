// Import necessary React and routing modules
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Main App component to define route structure
function App() {
  return (
    <Router>
      <Routes>
        {/* Default route - Home/Dashboard page */}
        <Route path="/" element={<Dashboard />} />

        {/* Login page route */}
        <Route path="/login" element={<Login />} />

        {/* Register page route */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

// Export App as default component
export default App;
