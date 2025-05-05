// This file is no longer needed since we're using the App Router approach
// It's maintained only for reference

/*
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import ProfileSettings from './pages/ProfileSettings';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
*/

// Placeholder app component for Next.js App Router
export default function App() {
  return null;
} 