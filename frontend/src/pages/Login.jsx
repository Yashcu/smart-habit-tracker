import AuthForm from '../components/Authform';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { memo, useCallback } from 'react';

function Login() {
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data) => {
    try {
      const res = await login(data);
      loginUser(res.data);
      navigate('/');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed. Please try again.');
    }
  }, [loginUser, navigate]);

  return <AuthForm onSubmit={handleSubmit} title="Login" />;
}

export default memo(Login);
