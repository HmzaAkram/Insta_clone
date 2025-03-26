import React from 'react';
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Feed() {
  return (
    <div className="flex-grow max-w-xl mx-auto">
      {/* Stories */}
      <div className="bg-white border rounded-lg p-4 mb-4 mt-8">
        <div className="flex space-x-4 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0">
              <div className="w-16 h-16 rounded-full ring-2 ring-pink-500 p-1">
                <img
                  src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=150&h=150&fit=crop`}
                  alt={`Story ${i}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-xs">user_{i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Posts */}
      {[1, 2, 3].map((post) => (
        <div key={post} className="bg-white border rounded-lg mb-4">
          <div className="flex items-center justify-between p-4">
            <Link to={`/profile/${post}`} className="flex items-center space-x-3">
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + post}?w=50&h=50&fit=crop`}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold">user_{post}</span>
            </Link>
            <MoreHorizontal className="w-5 h-5 cursor-pointer" />
          </div>
          <img
            src={`https://images.unsplash.com/photo-${1600000000000 + post}?w=600&h=600&fit=crop`}
            alt="Post"
            className="w-full aspect-square object-cover"
          />
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Heart className="w-6 h-6 cursor-pointer" />
                <MessageCircle className="w-6 h-6 cursor-pointer" />
                <Share2 className="w-6 h-6 cursor-pointer" />
              </div>
              <Bookmark className="w-6 h-6 cursor-pointer" />
            </div>
            <div className="font-semibold mb-2">{Math.floor(Math.random() * 1000)} likes</div>
            <p>
              <span className="font-semibold mr-2">user_{post}</span>
              Beautiful sunset view! 🌅 #nature #photography
            </p>
            <p className="text-gray-500 text-sm mt-2">View all {Math.floor(Math.random() * 100)} comments</p>
            <p className="text-gray-400 text-xs mt-1">2 HOURS AGO</p>
          </div>
        </div>
      ))}
    </div>
  );
}