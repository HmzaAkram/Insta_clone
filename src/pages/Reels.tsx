import React from 'react';
import { Heart, MessageCircle, Bookmark, Share2, Music2 } from 'lucide-react';

export function Reels() {
  const reels = [
    {
      id: 1,
      user: {
        username: 'dance_lover',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      },
      video: 'https://example.com/video1.mp4',
      description: '✨ Dancing in the rain! #dance #fun',
      song: 'Original Sound - dance_lover',
      likes: '127.5k',
      comments: '1,234'
    },
    {
      id: 2,
      user: {
        username: 'food_explorer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      },
      video: 'https://example.com/video2.mp4',
      description: '🍝 Making pasta from scratch! #cooking #foodie',
      song: 'Cooking Time - food_explorer',
      likes: '98.2k',
      comments: '856'
    }
  ];

  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="max-w-[468px] mx-auto">
        {reels.map((reel) => (
          <div key={reel.id} className="relative h-screen">
            {/* Video Placeholder (since we can't actually play videos) */}
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <p className="text-white text-lg">Video Content</p>
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex">
              {/* Left side - Main Content */}
              <div className="flex-1 flex flex-col justify-end p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={reel.user.avatar}
                    alt={reel.user.username}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <span className="text-white font-semibold">{reel.user.username}</span>
                  <button className="px-4 py-1 border border-white text-white rounded-md text-sm font-semibold">
                    Follow
                  </button>
                </div>
                <p className="text-white mb-2">{reel.description}</p>
                <div className="flex items-center space-x-2">
                  <Music2 className="w-4 h-4 text-white" />
                  <p className="text-white text-sm">{reel.song}</p>
                </div>
              </div>

              {/* Right side - Actions */}
              <div className="w-16 flex flex-col items-center justify-end space-y-4 p-4">
                <button className="flex flex-col items-center">
                  <Heart className="w-7 h-7 text-white" />
                  <span className="text-white text-xs mt-1">{reel.likes}</span>
                </button>
                <button className="flex flex-col items-center">
                  <MessageCircle className="w-7 h-7 text-white" />
                  <span className="text-white text-xs mt-1">{reel.comments}</span>
                </button>
                <button>
                  <Bookmark className="w-7 h-7 text-white" />
                </button>
                <button>
                  <Share2 className="w-7 h-7 text-white" />
                </button>
                <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden mt-2">
                  <img
                    src={reel.user.avatar}
                    alt="Audio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}