import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user.tipo === "ong") {
      return <Navigate to="/ong-home" replace />;
    } else {
      return <Navigate to="/adotante-home" replace />;
    }
  }
  return <Outlet />;
};

export default PublicRoute;