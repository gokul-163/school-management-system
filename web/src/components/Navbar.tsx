'use client';
import { FiMenu, FiBell } from 'react-icons/fi';

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4">
      <button className="md:hidden" onClick={toggleSidebar}>
        <FiMenu className="text-2xl" />
      </button>
      <h1 className="hidden md:block text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <FiBell className="text-xl cursor-pointer" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full" />
          <span className="hidden md:block">Admin</span>
        </div>
      </div>
    </header>
  );
}
