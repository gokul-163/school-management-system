'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FiMenu, FiUsers, FiBarChart2, FiBell, FiLogOut, FiBookOpen, FiHome, FiGithub } from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { name: 'Students', icon: <FiUsers />, path: '/students' },
    { name: 'Teachers', icon: <FiBookOpen />, path: '/teachers' },
    { name: 'Classes', icon: <FiBarChart2 />, path: '/classes' },
    { name: 'GitHub', icon: <FiGithub />, path: '/github' },
  ];

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/');
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const getActiveItem = () => {
    return menuItems.find(item => item.path === pathname)?.name || 'Dashboard';
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}
      >
        <div className="p-6 text-xl font-bold border-b bg-blue-600 text-white">
          School Management
        </div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setSidebarOpen(false);
                navigateTo(item.path);
              }}
              className={`flex items-center w-full text-left px-4 py-3 my-1 rounded-lg transition-colors ${
                pathname === item.path
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left px-4 py-3 my-1 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 mt-8"
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
          <div className="text-xl font-bold hidden md:block">{getActiveItem()}</div>
          <div className="flex items-center space-x-4">
            <FiBell className="text-xl cursor-pointer hover:text-blue-500" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="hidden md:block">Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
