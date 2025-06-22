import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Suspense, lazy } from 'react';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <h1 className="text-3xl text-center">Welcome to Smart Habit Tracker</h1>
    </div>
  );
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
