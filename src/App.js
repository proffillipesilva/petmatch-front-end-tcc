import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import MeuForm from './MeuForm';
import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' ou 'register'

  const handleSwitchToLogin = () => {
    setCurrentScreen('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentScreen('register');
  };

  return (
    <div className="App">
      {currentScreen === 'login' ? (
        <LoginScreen onSwitchToRegister={handleSwitchToRegister} />
      ) : (
        <MeuForm onSwitchToLogin={handleSwitchToLogin} />
      )}
    </div>
  );
}

export default App;