'use client';
import Link from 'next/link';
import { FiUsers, FiBook, FiBarChart2, FiSettings } from 'react-icons/fi';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <FiBarChart2 /> },
    { name: 'Students', href: '/students', icon: <FiUsers /> },
    { name: 'Teachers', href: '/teachers', icon: <FiUsers /> },
    { name: 'Classes', href: '/classes', icon: <FiBook /> },
    { name: 'Settings', href: '/settings', icon: <FiSettings /> },
  ];

  return (
    <aside className="w-64 bg-white p-6 shadow-md min-h-screen">
      <h1 className="text-xl font-bold mb-6">School SMS</h1>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-3 py-2 rounded hover:bg-gray-200"
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
