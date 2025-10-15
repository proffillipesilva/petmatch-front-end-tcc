import api from "../../../shared/utils/api";

/**
 * Serviço de API específico para operações de ONG, como o registro.
 */
const OngService = {

  /**
   * Realiza o registro de uma nova ONG.
   * @param {object} registerData - Todos os dados do formulário de registro de ONG.
   * @returns {Promise<object>} - Uma Promise que resolve para os dados da ONG registrada.
   */
  async registerOng(registerData) {
    try {
      const endpoint = "/v1/api/usuarios/ong";
      
      // O payload é exatamente o objeto que o formulário está enviando (nomeOng, cnpj, emailOng, etc.)
      const response = await api.post(endpoint, registerData);
      return response.data;
    } catch (error) {
      console.error("Erro no registro de ONG:", error.response || error);
      
      let errorMessage = "Erro ao registrar. Por favor, tente novamente.";
      
      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = "Este CNPJ ou e-mail já está cadastrado. Por favor, use outro.";
        } else if (error.response.data && error.response.data.message) {
          // Captura a mensagem de erro detalhada enviada pelo backend
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Erro ao cadastrar: Status ${error.response.status}`;
        }
      }
      
      // Lançamos o erro já formatado para o componente
      throw new Error(errorMessage);
    }
  },
};

export default OngService;