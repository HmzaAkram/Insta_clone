import React from 'react';
import { Search, Home, PlusSquare, Film, Send } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const isMessagesActive = location.pathname.includes('/messages');
  const isReelsActive = location.pathname === '/reels';

  return (
    <header className="bg-white border-b fixed w-full top-0 z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-4">
        <Link to="/" className="text-2xl font-bold">Instagram</Link>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 px-4 py-1 rounded-lg hidden sm:block"
          />
        </div>
        <nav className="flex items-center space-x-6">
          <Link to="/"><Home className={`w-6 h-6 cursor-pointer ${location.pathname === '/' ? 'text-black' : 'text-gray-500'}`} /></Link>
          <Link to="/messages"><Send className={`w-6 h-6 cursor-pointer ${isMessagesActive ? 'text-black' : 'text-gray-500'}`} /></Link>
          <PlusSquare className="w-6 h-6 cursor-pointer text-gray-500" />
          <Link to="/reels"><Film className={`w-6 h-6 cursor-pointer ${isReelsActive ? 'text-black' : 'text-gray-500'}`} /></Link>
          <Link to="/profile">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-6 h-6 rounded-full cursor-pointer"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}