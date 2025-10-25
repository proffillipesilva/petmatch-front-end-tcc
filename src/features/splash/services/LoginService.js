import api from "../../../shared/utils/api";

/**
 * Serviço de API para operações de Autenticação (Login e Registro).
 */
const LoginService = {

  /**
   * Realiza o registro de um novo usuário geral.
   * @param {object} registerData - Os dados de registro do usuário.
   * @returns {Promise<object>} - Uma Promise que resolve para os dados da resposta (incluindo o token).
   */
  async register(registerData) {
    try {
      const response = await api.post('/v1/api/auth/register', registerData);
      return response.data;
    } catch (error) {
      console.error('Erro no registro:', error.response || error);
      
      let errorMessage = 'Erro ao registrar. Por favor, tente novamente.';
      if (error.response && error.response.status === 409) {
        errorMessage = 'Este email já está registrado. Por favor, use outro.';
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      
      throw new Error(errorMessage);
    }
  },

  /**
   * Realiza o login de um usuário.
   * @param {object} loginData - As credenciais de login (email, password).
   * @returns {Promise<object>} - Uma Promise que resolve para os dados da resposta (incluindo o token).
   */
  async login(loginData) {
    try {
      const response = await api.post('/v1/api/auth/login', loginData);
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error.response || error);

      let errorMessage = 'Erro ao fazer login. Por favor, tente novamente.';
      if (error.response && error.response.status === 401) {
        errorMessage = 'Email ou senha inválidos.';
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      throw new Error(errorMessage);
    }
  },

  /**
   * Obtém os dados do usuário autenticado ('me').
   * @returns {Promise<object>} - Uma Promise que resolve para os dados completos do usuário logado.
   */
  async me() {
    try {
      // CORREÇÃO AQUI: Trocando 'users' por 'usuarios' para corresponder ao Back-end (erro 404)
      const response = await api.get('/v1/api/usuarios/me');
      return response.data;
    } catch (error) {
      console.error('Erro no me:', error.response || error);
      throw new Error(error.response?.data?.message || 'Não foi possível buscar os dados do usuário.');
    }
  },

  /**
   * Envia o token de notificação (FCM ou similar) do dispositivo do usuário.
   * @param {object} tokenData - O token do dispositivo (e.g., { token: string }).
   * @returns {Promise<object>} - Uma Promise que resolve para a resposta da API.
   */
  async sendToken(tokenData) {
    try {
      const response = await api.put('/v1/api/notifications/token', tokenData);
      return response.data;
    } catch (error) {
      console.error('Erro no envio do token:', error.response || error);

      let errorMessage = 'Erro ao enviar o token. Por favor, tente novamente.';
      if (error.response && error.response.status === 401) {
        errorMessage = 'Não autorizado.';
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      throw new Error(errorMessage);
    }
  },

};

export default LoginService;