// src/shared/utils/publicApi.js
import axios from "axios";
import { useStatusModalStore } from "../store/modal-store"; 

const { showLoading, showSuccess, showError, closeModal } = useStatusModalStore.getState();

const publicApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL 
}); 

// -----------------------------------------------------------------
// Request Interceptor (APENAS Modal)
// -----------------------------------------------------------------
publicApi.interceptors.request.use(
  (config) => {
    const httpMethod = config.method?.toLowerCase();

    // ✅ CORREÇÃO: Só mostra o loading se NÃO for GET
    // Isso garante que o Login (POST) e Cadastro (POST) mostrarão o loading.
    if (httpMethod !== 'get') {
      showLoading("Carregando...");
    }

    return config;
  },
  (error) => {
    closeModal();
    showError(`Erro na requisição: ${error.message}`);
    return Promise.reject(error);
  }
);

// -----------------------------------------------------------------
// Response Interceptor (APENAS Modal)
// -----------------------------------------------------------------
publicApi.interceptors.response.use(
  // SUCESSO (Status 2xx ou 3xx)
  (response) => {
    const httpMethod = response.config.method?.toLowerCase(); 
    
    // ✅ CORREÇÃO: Só fecha o modal e mostra sucesso se NÃO for GET
    // Isso garante que o Login (POST) e Cadastro (POST) mostrarão o sucesso.
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

    // Mostra o modal de erro (isso está correto)
    if (status) {
        showError(`Erro ${status}: ${message}`);
    } else {
        showError(`Falha de Conexão: ${message}`);
    }
    
    return Promise.reject(error);
  }
);

export default publicApi;