import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Settings, Grid, Bookmark, Film } from 'lucide-react';

export function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isOwnProfile = !userId;
  const username = isOwnProfile ? 'yourusername' : `user_${userId}`;
  
  const posts = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://images.unsplash.com/photo-${1600000000000 + i}?w=600&h=600&fit=crop`
  }));

  return (
    <div className="pt-16 max-w-6xl mx-auto">
      <div className="p-8">
        {/* Profile Header */}
        <div className="flex items-start gap-8 mb-8">
          <img
            src={`https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop`}
            alt={username}
            className="w-40 h-40 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-semibold">{username}</h1>
              {isOwnProfile ? (
                <>
                  <button 
                    onClick={() => navigate('/edit-profile')}
                    className="px-4 py-1.5 bg-gray-100 rounded-lg font-semibold"
                  >
                    Edit profile
                  </button>
                  <Settings className="w-6 h-6 cursor-pointer" />
                </>
              ) : (
                <button className="px-6 py-1.5 bg-blue-500 text-white rounded-lg font-semibold">
                  Follow
                </button>
              )}
            </div>
            <div className="flex gap-8 mb-4">
              <span><strong>123</strong> posts</span>
              <span><strong>1,234</strong> followers</span>
              <span><strong>567</strong> following</span>
            </div>
            <div>
              <h2 className="font-semibold">{isOwnProfile ? 'Your Name' : `User ${userId}`}</h2>
              <p className="text-gray-700">
                📸 Photography enthusiast<br />
                🌍 Travel lover<br />
                🎨 Creative mind
              </p>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="border-t">
          <div className="flex justify-center gap-12">
            <button className="flex items-center gap-1 py-4 font-semibold border-t border-black -mt-px">
              <Grid className="w-4 h-4" />
              POSTS
            </button>
            {isOwnProfile && (
              <>
                <button className="flex items-center gap-1 py-4 text-gray-500">
                  <Bookmark className="w-4 h-4" />
                  SAVED
                </button>
                <Link to="/reels" className="flex items-center gap-1 py-4 text-gray-500">
                  <Film className="w-4 h-4" />
                  REELS
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-1 mt-4">
          {posts.map((post) => (
            <div key={post.id} className="aspect-square relative group cursor-pointer">
              <img
                src={post.imageUrl}
                alt={`Post ${post.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-200">
                  ❤️ {Math.floor(Math.random() * 1000)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}