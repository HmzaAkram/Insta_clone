import React from 'react';
import { Feed } from '../components/Feed';
import { Sidebar } from '../components/Sidebar';

export function Home() {
  return (
    <main className="max-w-6xl mx-auto pt-16 flex">
      <Feed />
      <Sidebar />
    </main>
  );
}