import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F0F0F5]">
      <Sidebar />
      <TopBar />
      <main className="ml-[220px] pt-20 min-h-screen">
        <div className="bg-[hsl(var(--background))] p-8">
          <Outlet />
        </div>
      </main>
    </div>);

}