import api from "../../../shared/utils/api";

/**
 * Payload para criar um Pet.
 * (Ajuste os campos conforme seu backend)
 * @typedef {object} CriarPetPayload
 * @property {string} nome
 * @property {string} especie (ex: "Cachorro", "Gato")
 * @property {string} porte (ex: "Pequeno", "Medio", "Grande")
 * @property {number} idade
 * @property {string} descricao
 * @property {string} imagemUrl
 * @property {string} idOng - (UUID) O ID da ONG.
 */

const PetService = {
  /**
   * Busca a lista de todos os pets.
   */
  async getPets() {
    try {
      // ⚠️ Ajuste a Rota: /v1/api/pet ou /v1/api/animais
      const response = await api.get("/v1/api/pet");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar pets:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Busca os detalhes de um único pet pelo ID.
   */
  async getPetById(id) {
    try {
      // ⚠️ Ajuste a Rota: /v1/api/pet/${id}
      const response = await api.get(`/v1/api/pet/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar pet por ID:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Cria um novo pet.
   * @param {CriarPetPayload} payload Os dados do pet.
   */
  async criarPet(payload) {
    try {
      // ⚠️ Ajuste a Rota: /v1/api/pet
      const response = await api.post("/v1/api/pet", payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar pet:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Deleta um pet pelo ID.
   */
  async deletarPet(id) {
    try {
      // ⚠️ Ajuste a Rota: /v1/api/pet/${id}
      await api.delete(`/v1/api/pet/${id}`);
    } catch (error) {
      console.error("Erro ao deletar pet:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default PetService;