import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="pt-20 w-full p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;