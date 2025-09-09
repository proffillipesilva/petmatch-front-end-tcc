// src/App.jsx
import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SidebarMenu from "./features/home/SidebarMenu";
import LoginScreen from "./features/home/components/LoginScreen";
import TipoCadastro from "./features/home/components/TipoCadastro";
import MeuForm from "./features/home/components/MeuForm";
import AdotanteForm from "./features/home/components/AdotanteForm";
import "./index.css";

// Homes separadas
const OngHome = ({ user }) => (
  <div>
    <h1 className="text-4xl font-bold mb-2">Bem-vindo, {user?.nomeOng}</h1>
    <p className="text-gray-600 mb-6">
      Painel da ONG — gerencie seus animais e cadastros.
    </p>
  </div>
);

const AdotanteHome = ({ user }) => (
  <div>
    <h1 className="text-4xl font-bold mb-2">Bem-vindo, {user?.nomeAdotante}</h1>
    <p className="text-gray-600 mb-6">
      Explore ONGs e encontre animais para adoção!
    </p>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("inicio");
  const [user, setUser] = useState(null);

  // ====== Handlers de Navegação ======
  const handleNavigation = (screen) => {
    if (screen === "sair") {
      setIsAuthenticated(false);
      setUser(null);
      setCurrentScreen("login"); // Mudar para login ao sair
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);

    // Redirecionar para a home correta
    setCurrentScreen(userData.tipo === "ong" ? "ongHome" : "adotanteHome");
  };

  const handleSwitchToTipoCadastro = () => setCurrentScreen("tipoCadastro");
  const handleSwitchToAdotanteForm = () => setCurrentScreen("registerAdotante");
  const handleSwitchToOngForm = () => setCurrentScreen("registerOng");
  const handleSwitchToLogin = () => setCurrentScreen("login");

  // ====== Mapeamento de telas para renderização ======
  const renderScreen = () => {
    if (!isAuthenticated) {
      switch (currentScreen) {
        case "login":
          return (
            <LoginScreen
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
          return <LoginScreen onSwitchToRegister={handleSwitchToTipoCadastro} onLoginSuccess={handleLoginSuccess} />;
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
          return user.tipo === "ong" ? <OngHome user={user} /> : <AdotanteHome user={user} />;
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
      <div className="flex min-h-screen bg-auth-pattern bg-cover bg-center bg-no-repeat">
        <SidebarMenu
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