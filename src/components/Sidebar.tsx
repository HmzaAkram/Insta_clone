import React from 'react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className="w-[350px] ml-8 hidden lg:block pt-8">
      <div className="fixed w-[350px]">
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/profile">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="Your Profile"
              className="w-12 h-12 rounded-full"
            />
          </Link>
          <div>
            <p className="font-semibold">yourusername</p>
            <p className="text-gray-500">Your Name</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-semibold">Suggestions For You</span>
            <button className="text-sm font-semibold">See All</button>
          </div>
          {[1, 2, 3, 4, 5].map((suggestion) => (
            <div key={suggestion} className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={`https://images.unsplash.com/photo-${1700000000000 + suggestion}?w=50&h=50&fit=crop`}
                  alt={`Suggestion ${suggestion}`}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">suggested_user_{suggestion}</p>
                  <p className="text-gray-500 text-xs">Followed by user_{suggestion}</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm font-semibold">Follow</button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p className="mb-4">
            About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language
          </p>
          <p>© 2025 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
}