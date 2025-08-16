'use client';

import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // optional, for checking auth token

export default function LoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get('token'); // or check via localStorage
    if (token) router.push('/dashboard');
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        await api.post('/api/auth/register-admin', {
          name: 'Admin',
          email,
          password,
        });
      } else {
        await api.post('/api/auth/login', { email, password });
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong');
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
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-xl py-2 disabled:opacity-50"
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
            className="underline text-blue-600"
            onClick={() =>
              setMode(mode === 'register' ? 'login' : 'register')
            }
          >
            Switch to {mode === 'register' ? 'Login' : 'Register Admin'}
          </button>
        </div>
      </div>
    </div>
  );
}
