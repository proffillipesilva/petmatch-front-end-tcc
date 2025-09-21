import React from 'react';
import AuthImg from './assets/Auth.png';
import LoginScreen from './components/LoginScreen'; 

const SplashScreen = ({ onSwitchToRegister, onLoginSuccess }) => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${AuthImg})`
      }}
    >
      <div className="relative z-10 w-full max-w-sm">
        <LoginScreen 
          onSwitchToRegister={onSwitchToRegister}
          onLoginSuccess={onLoginSuccess}
        />
      </div>
    </div>
  );
};

export default SplashScreen;