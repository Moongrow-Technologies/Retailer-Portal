import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F0F0F5]">
      <Sidebar />
      <TopBar />
      <main className="ml-[200px] pt-14 min-h-screen" style={{minHeight: 'calc(100vh - 56px)'}}>
        <div className="bg-[hsl(var(--background))] p-8 xl:px-10 2xl:px-16">
          <Outlet />
        </div>
      </main>
    </div>);

}