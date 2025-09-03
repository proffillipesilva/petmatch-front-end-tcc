// src/App.jsx
import React, { useState } from "react";
import SidebarMenu from "./features/home/SidebarMenu";
import LoginScreen from "./features/home/components/LoginScreen";
import MeuForm from "./features/home/components/MeuForm"; // Formulário ONG
import AdotanteForm from "./features/home/components/AdotanteForm"; // Formulário Usuário/Adotante
import TipoCadastro from "./features/home/components/TipoCadastro"; // Tela de escolha de cadastro
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

import Frame1 from "./images/Frame1.png";
import AuthImage from './images/Auth.png';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("login");
  const [user, setUser] = useState(null);

  const handleNavigation = (screen) => {
    if (screen === "sair") {
      setIsAuthenticated(false);
      setCurrentScreen("login");
      setUser(null);
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentScreen("inicio");
  };

  // Funções para navegar entre telas
  const handleSwitchToTipoCadastro = () => setCurrentScreen("tipoCadastro");
  const handleSwitchToAdotanteForm = () => setCurrentScreen("registerAdotante");
  const handleSwitchToOngForm = () => setCurrentScreen("registerOng");
  const handleSwitchToLogin = () => setCurrentScreen("login");

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
      <div className="App min-h-screen bg-auth-pattern bg-cover bg-center bg-no-repeat">
        {!isAuthenticated ? (
          <>
            {currentScreen === "login" && (
              <LoginScreen
                onSwitchToRegister={handleSwitchToTipoCadastro}
                onLoginSuccess={handleLoginSuccess}
              />
            )}
            {currentScreen === "tipoCadastro" && (
              <TipoCadastro
                onSelectAdotante={handleSwitchToAdotanteForm}
                onSelectOng={handleSwitchToOngForm}
                onBack={handleSwitchToLogin} // Adicione esta linha
            />
            )}
            {currentScreen === "registerAdotante" && (
              <AdotanteForm onSwitchToLogin={handleSwitchToLogin} />
            )}
            {currentScreen === "registerOng" && (
              <MeuForm onSwitchToLogin={handleSwitchToLogin} />
            )}
          </>
        ) : (
          <div className="flex min-h-screen bg-auth-pattern bg-cover bg-center bg-no-repeat">
            {/* CORREÇÃO: Passando a propriedade userName para o SidebarMenu */}
            <SidebarMenu onNavigate={handleNavigation} userName={user?.nomeOng || user?.nomeAdotante} />
            <main className="ml-64 p-6 w-full">
              {currentScreen === "inicio" && (
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Bem-vindo(a) {user?.nomeOng || user?.nomeAdotante}
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Escolha uma ONG para ver os animais disponíveis para adoção
                  </p>
                </div>
              )}
              {currentScreen === "adotar" && (
                <h1 className="text-4xl font-bold">Página de Adoção</h1>
              )}
              {currentScreen === "novidades" && (
                <h1 className="text-4xl font-bold">Novidades do PetMatch</h1>
              )}
            </main>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;