import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (userData.tipo === "ong") {
      navigate("/ong-home");
    } else {
      navigate("/adotante-home");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};