import api from "../../../shared/utils/api";

const LoginService = {
  /**
   * Realiza o login de um usuário.
   * @param {object} loginData - { email: string, password: string }
   * @param {string} loginType - 'adotante' ou 'ong'
   * @returns {Promise<object>}
   */
  async login(loginData, loginType) {
    try {
      const payload =
        loginType === "adotante"
          ? { emailAdotante: loginData.email, senha: loginData.password }
          : { emailOng: loginData.email, senha: loginData.password };

      const endpoint = "/v1/api/auth/login";

      const response = await api.post(endpoint, payload);
      return response.data;
    } catch (error) {
      console.error("Erro no login:", error.response || error);
      let errorMessage = "Erro ao fazer login. Por favor, tente novamente.";
      if (error.response && error.response.status === 401) {
        errorMessage = "Email ou senha inválidos.";
      }
      throw new Error(errorMessage);
    }
  },

  /**
   * Realiza o registro de um novo usuário.
   * @param {object} registerData - Os dados de registro.
   * @param {string} registerType - 'adotante' ou 'ong'
   * @returns {Promise<object>}
   */
  async register(registerData, registerType) {
    try {
      const endpoint =
        registerType === "adotante" ? "/adotantes/register" : "/ongs/register";

      const response = await api.post(endpoint, registerData);
      return response.data;
    } catch (error) {
      console.error("Erro no registro:", error.response || error);
      let errorMessage = "Erro ao registrar. Por favor, tente novamente.";
      if (error.response && error.response.status === 409) {
        errorMessage = "Este email já está registrado. Por favor, use outro.";
      }
      throw new Error(errorMessage);
    }
  },
};

export default LoginService;
