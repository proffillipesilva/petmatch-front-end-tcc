// src/services/OngService.js

// Importa a instância de API SEM o interceptor de Token JWT.
import publicApi from "../../../shared/utils/publicApi";

/**
 * Serviço de API específico para operações de ONG, como o registro.
 */
const OngService = {
  /**
   * Realiza o registro de uma nova ONG.
   * @param {object} registerData - Dados do formulário de registro.
   * @returns {Promise<object>} - Dados retornados pelo back-end.
   */
  async registerOng(registerData) {
    try {
      const endpoint = "/v1/api/usuarios/ong";
      const response = await publicApi.post(endpoint, registerData);

      return response.data;
    } catch (error) {
      console.error("Erro no registro de ONG:", error.response || error);

      let errorMessage = "Erro ao registrar. Por favor, tente novamente.";

      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = "Este CNPJ ou e-mail já está cadastrado. Por favor, use outro.";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Erro ao cadastrar: Status ${error.response.status}`;
        }
      }

      throw new Error(errorMessage);
    }
  },
};

export default OngService;
