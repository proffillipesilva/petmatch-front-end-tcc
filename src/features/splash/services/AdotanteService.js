// src/services/AdotanteService.js

// Importa a instância de API SEM o interceptor de Token JWT.
import publicApi from "../../../shared/utils/publicApi";

/**
 * Serviço de API específico para operações de Adotante, como o registro.
 */
const AdotanteService = {
  /**
   * Realiza o registro de um novo Adotante.
   * @param {object} registerData - Dados do formulário de registro.
   * @returns {Promise<object>} - Dados retornados pelo back-end.
   */
  async registerAdotante(registerData) {
    try {
      const endpoint = "/v1/api/usuarios/adotante";
      const response = await publicApi.post(endpoint, registerData);

      return response.data;
    } catch (error) {
      console.error("Erro no registro de adotante:", error.response || error);

      let errorMessage = "Erro ao registrar. Por favor, tente novamente.";

      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = "Este email ou CPF já está registrado. Por favor, use outro.";
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

export default AdotanteService;
