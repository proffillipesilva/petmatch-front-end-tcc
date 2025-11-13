import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from './shared/context/AuthContext';

import MainLayout from './shared/components/MainLayout';
import SplashScreen from './features/splash/SplashScreen';
import Home from './features/home/Home';
import OngHome from './features/home/OngHome';
import AdotanteHome from './features/home/AdotanteHome';
import LoginScreen from './features/splash/components/LoginScreen';
import TipoCadastro from './features/splash/components/TipoCadastro'; 
import AdotanteForm from './features/splash/components/AdotanteForm';
import OngForm from './features/splash/components/OngForm';
import NovidadesScreen from './features/home/NovidadesScreen';
import StatusModal from './shared/components/StatusModal';
import { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './firebase';
import useAuthStore from './shared/store/AuthStore';
import PublicRoute from './shared/components/PublicRoute';
import PrivateRoute from './shared/components/PrivateRoute';
import EventosPage from './features/eventos/EventosPage'; // A nova lista (Passo 3)
import EventoPage from './features/eventos/[id]/EventoPage'; // A nova pág. de detalhes (Passo 4)
import EventoForm from './features/eventos/components/EventoForm';

import PetsPage from './features/pet/PetsPage';
import PetForm from './features/pet/components/PetForm';
import PetPage from './features/pet/[id]/PetPage';
// ou: import EventoForm from './features/eventos/components/EventoForm';

import './index.css';

function App() {
  const [token, setToken] = React.useState(null);
  const { setFcmToken } = useAuthStore();

  React.useEffect(() => {
    requestForToken()
      .then((currentToken) => {
        setToken(currentToken);
        setFcmToken(currentToken);
      })
      .catch((err) => console.error("Erro ao solicitar token:", err));
  }, []);

  React.useEffect(() => {
    const unsubscribe = onMessageListener().then(() => {});
    return () => {};
  }, []);

  return (
    <div className="bg-[#FFF3C4] min-h-screen">
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
        <Router>
          <AuthProvider>
            <Routes>
              {/* GRUPO 1: ROTAS PÚBLICAS GERAIS */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/novidades" element={<NovidadesScreen />} />
              </Route>

              {/* GRUPO 2: ROTAS DE "CONVIDADO" (Apenas para deslogados) */}
              <Route element={<PublicRoute />}>
                <Route element={<MainLayout />}>
                <Route path="/login" element={<SplashScreen><LoginScreen /></SplashScreen>} />
                <Route path="/tipo-cadastro" element={<SplashScreen><TipoCadastro /></SplashScreen>} />
                <Route path="/adotante-form" element={<SplashScreen><AdotanteForm /></SplashScreen>} />
                <Route path="/ong-form" element={<SplashScreen><OngForm /></SplashScreen>} />
                </Route>
              </Route>

              {/* GRUPO 3: ROTAS PRIVADAS (Apenas para logados) */}
              <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/ong-home" element={<OngHome />} />
                  <Route path="/adotante-home" element={<AdotanteHome />} />
                  
                  {/* === 👇 ROTAS DE EVENTOS ATUALIZADAS 👇 === */}

                  {/* 1. A Lista (Substitui EventoList por EventosPage) */}
                  <Route path="/eventos" element={<EventosPage />} />
                  
                  {/* 2. O Formulário (Já estava correto) */}
                  <Route path="/eventos/novo" element={<SplashScreen><EventoForm /></SplashScreen>} />

                  {/* 3. A Página de Detalhes (A nova rota que faltava) */}
                  <Route path="/eventos/:id" element={<SplashScreen><EventoPage /></SplashScreen>} />
                  


                  {/* === 🐾 NOVA ROTA DE LISTA DE PETS 🐾 === */}
                  {/* Adicionada aqui para usar o MainLayout (Header/Footer) */}
                  <Route path="/adotar" element={<PetsPage />} />

                  <Route path="/adotar/novo" element={<SplashScreen><PetForm /></SplashScreen>} />

                  <Route path="/adotar/:id" element={<SplashScreen><PetPage /></SplashScreen>} />

                </Route>
              </Route>

            </Routes>
          </AuthProvider>
        </Router>
        <Toaster />
        <StatusModal />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;