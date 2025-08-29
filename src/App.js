import React, { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import LoginScreen from "./LoginScreen";
import MeuForm from "./MeuForm";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Importa o GoogleOAuthProvider
import "./index.css";

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

  const handleSwitchToRegister = () => {
    setCurrentScreen("register");
  };

  const handleSwitchToLogin = () => {
    setCurrentScreen("login");
  };

  // Função que lida com o sucesso do login, seja via Google ou email/senha
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentScreen("inicio"); // vai direto para home
  };

  return (
    // Adicionando o GoogleOAuthProvider para envolver o aplicativo
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
      <div className="App min-h-screen bg-auth-pattern bg-cover bg-center bg-no-repeat">
        {!isAuthenticated ? (
          currentScreen === "login" ? (
            <LoginScreen
              onSwitchToRegister={handleSwitchToRegister}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : (
            <MeuForm onSwitchToLogin={handleSwitchToLogin} />
          )
        ) : (
          <div className="flex min-h-screen bg-auth-pattern bg-cover bg-center bg-no-repeat">
            <SidebarMenu onNavigate={handleNavigation} />

            <main className="ml-64 p-6 w-full">
              {currentScreen === "inicio" && (
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Bem-vindo(a) {user?.nomeOng}
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