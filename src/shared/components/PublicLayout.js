import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthImg from '../../features/splash/assets/Auth.png';

const PublicLayout = ({ children }) => { 
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${AuthImg})`
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-full max-w-sm">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;