// src/App.jsx
import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SidebarMenu from "./features/home/SidebarMenu";
import LoginScreen from "./features/home/components/LoginScreen";
import TipoCadastro from "./features/home/components/TipoCadastro";
import MeuForm from "./features/home/components/MeuForm";
import AdotanteForm from "./features/home/components/AdotanteForm";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("inicio");
  const [user, setUser] = useState(null);

  const handleNavigation = (screen) => {
    if (screen === "sair") {
      setIsAuthenticated(false);
      setUser(null);
      setCurrentScreen("inicio");
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentScreen("inicio");
  };

  const handleSwitchToTipoCadastro = () => setCurrentScreen("tipoCadastro");
  const handleSwitchToAdotanteForm = () => setCurrentScreen("registerAdotante");
  const handleSwitchToOngForm = () => setCurrentScreen("registerOng");
  const handleSwitchToLogin = () => setCurrentScreen("login");

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
      <div className="flex min-h-screen bg-auth-pattern bg-cover bg-center bg-no-repeat">
        <SidebarMenu
          onNavigate={handleNavigation}
          user={user}
        />

        <main className="pt-20 w-full p-6">
          {!isAuthenticated && currentScreen === "login" && (
            <LoginScreen
              onSwitchToRegister={handleSwitchToTipoCadastro}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {!isAuthenticated && currentScreen === "tipoCadastro" && (
            <TipoCadastro
              onSelectAdotante={handleSwitchToAdotanteForm}
              onSelectOng={handleSwitchToOngForm}
              onBack={handleSwitchToLogin}
            />
          )}

          {!isAuthenticated && currentScreen === "registerAdotante" && (
            <AdotanteForm onBackToLogin={handleSwitchToLogin} onCadastroSuccess={handleLoginSuccess} />
          )}

          {!isAuthenticated && currentScreen === "registerOng" && (
            <MeuForm onBackToLogin={handleSwitchToLogin} onCadastroSuccess={handleLoginSuccess} />
          )}

          {currentScreen === "inicio" && (
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {/* CORREÇÃO: Verifica nomeOng OU nome_adotante */}
                Bem-vindo(a) {user?.nomeOng || user?.nome_adotante || "ao PetMatch"}
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
    </GoogleOAuthProvider>
  );
}

export default App;