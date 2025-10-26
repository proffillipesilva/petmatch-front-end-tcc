import React from 'react';
import AuthImg from '../../features/splash/assets/Auth.png';

const SplashScreen = ({ children }) => {
  return (
    <div
      className="relative flex justify-center w-full min-h-screen bg-[#FFF3C4] bg-cover bg-center overflow-y-auto py-10"
      style={{ backgroundImage: `url(${AuthImg})` }}
    >
      <div className="relative z-10 w-full max-w-full min-w-[300px] px-4 flex justify-center items-start">
        {children}
      </div>
    </div>
  );
};

export default SplashScreen;