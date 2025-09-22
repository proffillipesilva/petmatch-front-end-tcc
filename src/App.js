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

import './index.css';

function App() {
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
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;