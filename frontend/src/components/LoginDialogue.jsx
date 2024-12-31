import React, { useState } from 'react';
import login from '../services/auth/login'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
const LoginDialogue = () => {
    const navigate =  useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
    const response = await login(formData);
    navigate('/location')
   } catch (error) {
    
   }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-md overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://placehold.co/600x200')] opacity-10 bg-cover bg-center">
            <div className="bg-[#3B82F6] px-3 py-1 text-white font-bold text-lg rounded-lg transition-opacity duration-300 opacity-100">
              L
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-slate-800">Welcome Back</div>
            <div className="text-slate-500 mt-2">Sign in to continue to Locator</div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-200 w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <div className="">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-slate-200 w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 bg-slate-200 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              {/* <a href="#" className="text-sm text-blue-500 hover:text-blue-600">Forgot password?</a> */}
            </div>
          </div>
      <div className="text-sm text-gray-800">Create an account? <Link to={'/auth/signup'}>Sign Up Here!</Link></div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginDialogue;
