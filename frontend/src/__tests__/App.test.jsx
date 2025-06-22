import { render, screen } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';

test('renders loading state', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
}); 