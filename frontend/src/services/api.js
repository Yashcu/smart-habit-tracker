import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Global error handling for token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Habit endpoints
export const getHabits = () => API.get('/habits');
export const createHabit = (data) => API.post('/habits', data);
export const updateHabit = (id, data) => API.put(`/habits/${id}`, data);
export const deleteHabit = (id) => API.delete(`/habits/${id}`);
export const checkInHabit = (id) => API.post(`/habits/${id}/checkin`);