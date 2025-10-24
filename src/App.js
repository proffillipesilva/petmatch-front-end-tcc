import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from './shared/context/AuthContext';

// Layouts e Componentes
import SplashScreen from './features/splash/SplashScreen';
import MainLayout from './shared/components/MainLayout';
import PublicRoute from './shared/components/PublicRoute';
import PrivateRoute from './shared/components/PrivateRoute';
import Home from './features/home/Home';
import OngHome from './features/home/OngHome';
import AdotanteHome from './features/home/AdotanteHome';
import LoginScreen from './features/splash/components/LoginScreen';
import TipoCadastro from './features/splash/components/TipoCadastro';
import AdotanteForm from './features/splash/components/AdotanteForm';
import OngForm from './features/splash/components/OngForm';
import { Toaster } from 'react-hot-toast'; // Importe o componente Toaster
import { requestForToken, onMessageListener } from './firebase';
import useAuthStore from './shared/store/AuthStore';
import './index.css';
import AdotarScreen from './features/home/AdotarScreen';
import NovidadesScreen from './features/home/NovidadesScreen';

function App() {
  const [token, setToken] = React.useState(null);
  const {setFcmToken} = useAuthStore() 

  // 1. Obtém o Token na montagem do componente
  React.useEffect(() => {
    requestForToken()
      .then((currentToken) => {
        setToken(currentToken);
        setFcmToken(currentToken)
      })
      .catch((err) => {
        console.error("Erro ao solicitar token:", err);
      });
  }, []);

  // 2. Configura o Listener para mensagens em Foreground
  React.useEffect(() => {
    // Registra o listener e obtém a função de limpeza (unsubscribe)
    const unsubscribe = onMessageListener().then(() => {
      // O then é chamado quando uma mensagem chega, mas o listener continua ativo
    });

    // Retorna a função de limpeza para que o listener seja removido ao desmontar o componente
    return () => {
      // Se necessário, implemente o unsubscribe do listener aqui.
      // Para onMessage(), o listener é geralmente ativo enquanto o app está montado.
    };
  }, []);
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/ong-home" element={<OngHome />} />
              <Route path="/adotante-home" element={<AdotanteHome />} />
              <Route path="/login" element={<SplashScreen><LoginScreen /></SplashScreen>} />
              <Route path="/tipo-cadastro" element={<SplashScreen><TipoCadastro /></SplashScreen>} />
              <Route path="/adotante-form" element={<SplashScreen><AdotanteForm /></SplashScreen>} />
              <Route path="/ong-form" element={<SplashScreen><OngForm /></SplashScreen>} />
              <Route path="/novidades" element={<NovidadesScreen />} />
              <Route path="/adotar" element={<AdotarScreen />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      {/* O componente Toaster deve ser renderizado uma única vez em um nível superior */}
      <Toaster />
    </GoogleOAuthProvider>
  );
}

export default App;