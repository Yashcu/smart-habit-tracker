import AuthForm from '../components/Authform';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { memo, useCallback } from 'react';

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data) => {
    try {
      const res = await register(data);
      login(res.data);
      navigate('/');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  }, [login, navigate]);

  return <AuthForm onSubmit={handleSubmit} title="Register" />;
}

export default memo(Register);
