import api from "../../../shared/utils/api";

/**
 * Serviço de API específico para operações de Adotante, como o registro.
 */
const AdotanteService = {

  /**
   * Realiza o registro de um novo usuário Adotante.
   * @param {object} registerData - Todos os dados do formulário de registro de adotante.
   * @returns {Promise<object>} - Uma Promise que resolve para os dados do usuário registrado.
   */
  async registerAdotante(registerData) {
    try {
      const endpoint = "/v1/api/usuarios/adotante";

      // O payload é exatamente o objeto que o formulário está enviando
      const response = await api.post(endpoint, registerData);
      return response.data;
    } catch (error) {
      console.error("Erro no registro de adotante:", error.response || error);
      
      let errorMessage = "Erro ao registrar. Por favor, tente novamente.";
      
      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = "Este email ou CPF já está registrado. Por favor, use outro.";
        } else if (error.response.data && error.response.data.message) {
          // Captura a mensagem de erro detalhada enviada pelo backend
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