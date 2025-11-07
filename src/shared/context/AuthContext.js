import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/AuthStore";
import useUserStore from "../store/UserStore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    setIsAuthenticated(true);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);

    useAuthStore.getState().setAuthData(jwtToken, jwtToken ? JSON.parse(atob(jwtToken.split('.')[1])) : null);
    useUserStore.getState().setMe(userData.tipo, userData);

    // ✨✨ CORREÇÃO AQUI ✨✨
    // Agora verificamos se 'userData.tipo' é 'ONG' (maiúsculo),
    // que é o que o seu backend está enviando.
    if (userData.tipo === "ONG") {
      navigate("/ong-home");
    } else {
      navigate("/adotante-home");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    useAuthStore.getState().logout();
    useUserStore.getState().logout();

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);