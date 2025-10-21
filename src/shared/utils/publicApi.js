// src/shared/utils/publicApi.js
import axios from "axios";

/**
 * Instância de API para rotas públicas (registro, login, etc.)
 * que NÃO DEVEM enviar o token JWT de usuário no cabeçalho Authorization.
 */
const publicApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL 
});

// Nota: Sem o interceptor de requisição de token.

export default publicApi;