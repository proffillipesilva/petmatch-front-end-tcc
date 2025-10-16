// src/services/AdotanteService.js

import api from "../../../shared/utils/api";

/**
 * Serviço de API específico para operações de Adotante, como o registro.
 */
const AdotanteService = {

  /**
   * Realiza o registro de um novo usuário Adotante.
   * @param {object} registerData - Todos os dados do formulário de registro de adotante.
   * @returns {Promise<object>} - Uma Promise que resolve para os dados do usuário registrado, incluindo o token.
   */
  async registerAdotante(registerData) {
    try {
      const endpoint = "/v1/api/usuarios/adotante";
      const response = await api.post(endpoint, registerData);
      // Assumimos que a resposta.data agora contém { token: "...", ...outrosDados }
      return response.data;
    } catch (error) {
      console.error("Erro no registro de adotante:", error.response || error);
      
      let errorMessage = "Erro ao registrar. Por favor, tente novamente.";
      
      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = "Este email ou CPF já está registrado. Por favor, use outro.";
        } else if (error.response.data && error.response.data.message) {
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