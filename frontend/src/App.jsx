import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function Home() {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-3xl text-center mb-6">Welcome to Smart Habit Tracker</h1>
      <button
        onClick={logout}
        className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
