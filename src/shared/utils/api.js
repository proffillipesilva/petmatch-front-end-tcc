// src/services/api.js
import axios from "axios";
import useAuthStore from "../store/AuthStore"; 
import { useStatusModalStore } from "../store/modal-store"; 

const { showLoading, showSuccess, showError, closeModal } = useStatusModalStore.getState();

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

// -----------------------------------------------------------------
// Request Interceptor (Modal + Token)
// -----------------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const httpMethod = config.method?.toLowerCase();

    // ✅ CORREÇÃO: Só mostra o loading se NÃO for GET (buscar dados)
    if (httpMethod !== 'get') {
      showLoading("Carregando...");
    }

    const token = useAuthStore.getState().token; 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Se a requisição falhar (ex: sem internet antes de enviar)
    // Não precisa checar o 'get' aqui, pois o showLoading pode nem ter sido chamado
    closeModal(); 
    showError(`Erro na requisição: ${error.message}`);
    return Promise.reject(error);
  }
);

// -----------------------------------------------------------------
// Response Interceptor (Modal)
// -----------------------------------------------------------------
api.interceptors.response.use(
  // SUCESSO (Status 2xx ou 3xx)
  (response) => {
    const httpMethod = response.config.method?.toLowerCase(); 
    
    // ✅ CORREÇÃO: Só fecha o modal e mostra sucesso se NÃO for GET
    if (httpMethod !== 'get') {
      closeModal();
      showSuccess(`Status ${response.status}: Operação realizada com sucesso!`);
    }
    
    return response;
  },
  
  // ERRO (Status 4xx ou 5xx)
  async (error) => {
    const httpMethod = error.config?.method?.toLowerCase();

    // ✅ CORREÇÃO: Só fecha o modal se ele foi aberto (ou seja, se não for GET)
    if (httpMethod !== 'get') {
      closeModal();
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // Mostra o modal de erro (isso está correto, queremos erros sempre)
    if (status) {
        showError(`Erro ${status}: ${message}`);
    } else {
        showError(`Falha de Conexão: ${message}`);
    }

    // Tratamento de 401 (isso está correto)
    if (status === 401) {
        useAuthStore.getState().logout(); 
    }

    return Promise.reject(error);
  }
);

export default api;