'use client';

import { useState, useEffect } from 'react';
import { FiMenu, FiUsers, FiBarChart2, FiSettings, FiBell, FiLogOut } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, activeSessions: 0, revenue: 0 });
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);

  const menuItems = [
    { name: 'Home', icon: <FiBarChart2 /> },
    { name: 'Users', icon: <FiUsers /> },
    { name: 'Settings', icon: <FiSettings /> },
  ];

  useEffect(() => {
    // Fetch users
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));

    // Fetch stats
    fetch('http://localhost:5000/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data));

    // Fetch user growth (line chart)
    fetch('http://localhost:5000/api/user-growth')
      .then((res) => res.json())
      .then((data) => setLineData(data));

    // Fetch user roles (bar chart)
    fetch('http://localhost:5000/api/user-roles')
      .then((res) => res.json())
      .then((data) => setBarData(data));
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}
      >
        <div className="p-6 text-xl font-bold border-b">Dashboard</div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActive(item.name);
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full text-left px-4 py-2 my-1 rounded ${
                active === item.name ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
          <button
            onClick={() => alert('Logging out...')}
            className="flex items-center w-full text-left px-4 py-2 my-1 rounded text-gray-700 hover:bg-gray-200 mt-4"
          >
            <FiLogOut className="mr-3" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow-md p-4">
          <div className="flex items-center md:hidden">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu className="text-2xl" />
            </button>
          </div>
          <div className="text-xl font-bold hidden md:block">Dashboard</div>
          <div className="flex items-center space-x-4">
            <FiBell className="text-xl cursor-pointer" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-8 h-8 rounded-full" />
              <span className="hidden md:block">Gokul D</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">{active}</h1>

          {/* Stats Cards */}
          {active === 'Home' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-gray-500">Total Users</h2>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-gray-500">Active Sessions</h2>
                  <p className="text-2xl font-bold">{stats.activeSessions}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-gray-500">Revenue</h2>
                  <p className="text-2xl font-bold">${stats.revenue}</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-gray-700 font-bold mb-4">User Growth (Monthly)</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-gray-700 font-bold mb-4">User Roles</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* Users Table */}
          {active === 'Users' && (
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {active === 'Settings' && <p className="text-gray-700">Adjust your preferences here.</p>}
        </main>
      </div>
    </div>
  );
}
