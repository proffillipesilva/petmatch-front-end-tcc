import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./shared/components/Navbar";
import SplashScreen from "./features/splash/SplashScreen"; // O CAMINHO FOI CORRIGIDO
import TipoCadastro from "./features/splash/components/TipoCadastro";
import MeuForm from "./features/splash/components/MeuForm";
import AdotanteForm from "./features/splash/components/AdotanteForm";
import OngHome from "./features/home/OngHome";
import AdotanteHome from "./features/home/AdotanteHome";

import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("login");
  const [user, setUser] = useState(null);

  const handleNavigation = (screen) => {
    if (screen === "sair") {
      setIsAuthenticated(false);
      setUser(null);
      setCurrentScreen("login");
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentScreen(userData.tipo === "ong" ? "ongHome" : "adotanteHome");
  };

  const handleSwitchToTipoCadastro = () => setCurrentScreen("tipoCadastro");
  const handleSwitchToAdotanteForm = () => setCurrentScreen("registerAdotante");
  const handleSwitchToOngForm = () => setCurrentScreen("registerOng");
  const handleSwitchToLogin = () => setCurrentScreen("login");

  const renderScreen = () => {
    if (!isAuthenticated) {
      switch (currentScreen) {
        case "login":
          return (
            <SplashScreen
              onSwitchToRegister={handleSwitchToTipoCadastro}
              onLoginSuccess={handleLoginSuccess}
            />
          );
        case "tipoCadastro":
          return (
            <TipoCadastro
              onSelectAdotante={handleSwitchToAdotanteForm}
              onSelectOng={handleSwitchToOngForm}
              onBack={handleSwitchToLogin}
            />
          );
        case "registerAdotante":
          return <AdotanteForm onBackToLogin={handleSwitchToLogin} />;
        case "registerOng":
          return <MeuForm onBackToLogin={handleSwitchToLogin} />;
        default:
          return (
            <SplashScreen
              onSwitchToRegister={handleSwitchToTipoCadastro}
              onLoginSuccess={handleLoginSuccess}
            />
          );
      }
    } else {
      switch (currentScreen) {
        case "ongHome":
          return <OngHome user={user} />;
        case "adotanteHome":
          return <AdotanteHome user={user} />;
        case "adotar":
          return <h1 className="text-4xl font-bold">Página de Adoção</h1>;
        case "novidades":
          return <h1 className="text-4xl font-bold">Novidades do PetMatch</h1>;
        default:
          return user.tipo === "ong" ? (
            <OngHome user={user} />
          ) : (
            <AdotanteHome user={user} />
          );
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
      <div className="flex min-h-screen">
        <Navbar
          onNavigate={handleNavigation}
          userName={user?.nomeOng || user?.nomeAdotante}
          userType={user?.tipo}
        />
        <main className="pt-20 w-full p-6">{renderScreen()}</main>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;