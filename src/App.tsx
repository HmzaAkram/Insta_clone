import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Messages } from './pages/Messages.tsx';
import { EditProfile } from './pages/EditProfile.tsx';
import { Reels } from './pages/Reels.tsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:userId" element={<Messages />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/reels" element={<Reels />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;