// components/AuthForm.jsx
"use client";

import { CheckCircle, Leaf, Calendar, TrendingUp, LoaderCircle } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useState, memo } from "react";

function AuthForm({ onSubmit, title }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background decorative elements - hidden on small screens */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-20 left-10 text-green-200 opacity-60">
          <CheckCircle size={24} />
        </div>
        <div className="absolute top-40 right-20 text-blue-200 opacity-50">
          <Calendar size={32} />
        </div>
        <div className="absolute bottom-32 left-20 text-emerald-200 opacity-40">
          <Leaf size={28} />
        </div>
        <div className="absolute bottom-20 right-16 text-green-300 opacity-50">
          <TrendingUp size={20} />
        </div>
        <div className="absolute top-1/2 left-1/4 text-blue-100 opacity-30">
          <CheckCircle size={16} />
        </div>
        <div className="absolute top-1/3 right-1/3 text-emerald-100 opacity-40">
          <Leaf size={20} />
        </div>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border-0 relative z-10 rounded-lg">
        <div className="space-y-2 text-center py-6 px-4 sm:px-6">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {title === "Login" ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-sm text-gray-600 px-4 sm:px-0">
            {title === "Login" ? "Sign in to continue your habit journey" : "Start your habit journey with us!"}
          </p>
        </div>
        <div className="space-y-4 p-4 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {title === 'Register' && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm transition-all focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm transition-all focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm transition-all focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 text-center text-sm text-red-600 bg-red-100 border border-red-200 rounded-md p-3" role="alert">
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl mt-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                title === "Login" ? "Sign in" : "Sign up"
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            {title === "Login" ? "Don't have an account?" : "Already have an account?"}{" "}
            {title === "Login" ? (
              <RouterLink to="/register" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                Sign up
              </RouterLink>
            ) : (
              <RouterLink to="/login" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                Log in
              </RouterLink>
            )}
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none hidden sm:block" />
    </div>
  );
}

export default memo(AuthForm);