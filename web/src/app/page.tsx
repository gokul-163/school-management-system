'use client';

import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        const response = await api.post('/api/auth/register-admin', {
          name: 'Admin',
          email,
          password,
        });
        
        if (response.status === 201) {
          setMode('login');
          setError('Admin registered successfully! Please login.');
          setLoading(false);
          return;
        }
      } else {
        const response = await api.post('/api/auth/login', { email, password });
        
        if (response.data && response.data.token) {
          // Store token in cookie
          Cookies.set('token', response.data.token, { 
            expires: 1, // 1 day
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          
          // Store user info if needed
          if (response.data.user) {
            Cookies.set('user', JSON.stringify(response.data.user), { 
              expires: 1,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict'
            });
          }
          
          router.push('/dashboard');
          return;
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      if (err.response) {
        // Server responded with error
        const errorMessage = err.response.data?.message || err.response.data?.error || 'Server error occurred';
        setError(errorMessage);
      } else if (err.request) {
        // Network error
        setError('Network error. Please check your connection and try again.');
      } else {
        // Other error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          School Management System
        </h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          {mode === 'register'
            ? 'First time? Create an Admin account.'
            : 'Welcome back! Please login.'}
        </p>

        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div className={`text-sm p-3 rounded-lg ${
              error.includes('successfully') 
                ? 'text-green-700 bg-green-100' 
                : 'text-red-600 bg-red-100'
            }`}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-xl py-2 disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            {loading
              ? 'Please wait...'
              : mode === 'register'
              ? 'Register Admin'
              : 'Login'}
          </button>
        </form>

        <div className="text-sm mt-4 text-center">
          <button
            type="button"
            className="underline text-blue-600 hover:text-blue-800"
            onClick={() => {
              setMode(mode === 'register' ? 'login' : 'register');
              setError(null);
            }}
          >
            Switch to {mode === 'register' ? 'Login' : 'Register Admin'}
          </button>
        </div>
      </div>
    </div>
  );
}
