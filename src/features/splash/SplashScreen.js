import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthImg from '../../features/splash/assets/Auth.png';

const SplashScreen = ({ children }) => { 
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${AuthImg})`
      }}
    >
<div className="relative z-10 w-full max-w-[600px] min-w-[300px] px-4">
  {children}
</div>
    </div>
  );
};

export default SplashScreen;