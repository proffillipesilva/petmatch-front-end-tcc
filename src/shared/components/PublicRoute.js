import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import useUserStore from '../store/UserStore';

const PublicRoute = () => {
  const token = useAuthStore((state) => state.token);
  const userType = useUserStore((state) => state.tipo);

  // Só redireciona se AMBOS existirem
  if (token && userType) {
    
    // [ALTERAÇÃO] Verificamos o tipo de forma insensível a maiúsculas/minúsculas
    if (userType.toLowerCase() === 'ong') {
      return <Navigate to="/ong-home" replace />;
    } 
    
    // [ALTERAÇÃO] Se não for 'ong', asumimos que é 'adotante'
    // Isso é mais seguro e cobre casos como "ADOTANTE" ou "Adotante"
    else {
      return <Navigate to="/adotante-home" replace />;
    }
  }

  // Se o token ou o userType ainda não foram definidos (processo de login em andamento),
  // ou se o usuário está deslogado, renderiza o Outlet (o formulário).
  return <Outlet />;
};

export default PublicRoute;