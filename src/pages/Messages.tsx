// import React from 'react';
import { useParams } from 'react-router-dom';
import { Search, Phone, Video, Info } from 'lucide-react';

export function Messages() {
  const { userId } = useParams();
  const conversations = [
    { id: 1, name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', lastMessage: 'Hey, how are you?' },
    { id: 2, name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', lastMessage: 'The photos look great!' },
    { id: 3, name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', lastMessage: 'See you tomorrow!' },
  ];

  return (
    <div className="pt-16 h-screen">
      <div className="max-w-6xl mx-auto h-[calc(100vh-4rem)] flex">
        {/* Conversations List */}
        <div className="w-80 border-r bg-white">
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
          <div className="p-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-12rem)]">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`p-4 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer ${
                  userId === String(conv.id) ? 'bg-gray-100' : ''
                }`}
              >
                <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold">{conv.name}</h3>
                  <p className="text-sm text-gray-500">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {userId ? (
          <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                  alt="Chat user"
                  className="w-8 h-8 rounded-full"
                />
                <h2 className="font-semibold">John Doe</h2>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 cursor-pointer" />
                <Video className="w-6 h-6 cursor-pointer" />
                <Info className="w-6 h-6 cursor-pointer" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs">
                  Hey! How are you?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs">
                  I'm good, thanks! How about you?
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Message..."
                className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <Send className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
              <p className="text-gray-500">Send private photos and messages to a friend</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}