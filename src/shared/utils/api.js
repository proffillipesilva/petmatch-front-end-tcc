import axios from "axios";
// Importe a store do Zustand
import useAuthStore from "../store/AuthStore";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

// Request interceptor to add the bearer token
api.interceptors.request.use(
  (config) => {
    // Acessa o estado da store, garantindo que o token venha do Zustand
    // Use .getState() para acessar fora de um componente React
    const token = useAuthStore.getState().token; 

    // Se um token existir, adicione-o ao cabeçalho Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default api;