import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// [ALTERAÇÃO] Importa o store do Zustand em vez do Context
import useAuthStore from '../store/AuthStore';

const PrivateRoute = () => {
  // [ALTERAÇÃO] Lê o token diretamente do Zustand
  const token = useAuthStore((state) => state.token);
  
  if (!token) {
    // [ALTERAÇÃO] Redireciona para /login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }
  
  // [ALTERAÇÃO] Apenas renderiza o <Outlet /> (as rotas filhas protegidas)
  // O layout (Navbar, etc.) deve estar no seu componente MainLayout
  return <Outlet />;
};

export default PrivateRoute;