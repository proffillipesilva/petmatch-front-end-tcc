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

<<<<<<< HEAD
// Define a rota base correta, confirmada pelo AnimaisController.java
const ROTA_API = "/v1/api/animais"; 

=======
>>>>>>> 29efca2fde73e0a003e8a57d4913bed88a847845
const PetService = {
  /**
   * Busca a lista de todos os pets.
   */
  async getPets() {
    try {
<<<<<<< HEAD
      // Rota corrigida (mapeia para @GetMapping em AnimaisController)
      const response = await api.get(ROTA_API); 
=======
      // ⚠️ Ajuste a Rota: /v1/api/pet ou /v1/api/animais
      const response = await api.get("/v1/api/pet");
>>>>>>> 29efca2fde73e0a003e8a57d4913bed88a847845
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
<<<<<<< HEAD
      // Rota corrigida (mapeia para @GetMapping("/{id}"))
      const response = await api.get(`${ROTA_API}/${id}`);
=======
      // ⚠️ Ajuste a Rota: /v1/api/pet/${id}
      const response = await api.get(`/v1/api/pet/${id}`);
>>>>>>> 29efca2fde73e0a003e8a57d4913bed88a847845
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
<<<<<<< HEAD
      // Rota corrigida (mapeia para @PostMapping)
      const response = await api.post(ROTA_API, payload);
=======
      // ⚠️ Ajuste a Rota: /v1/api/pet
      const response = await api.post("/v1/api/pet", payload);
>>>>>>> 29efca2fde73e0a003e8a57d4913bed88a847845
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
<<<<<<< HEAD
      // Rota corrigida (mapeia para @DeleteMapping("/{id}"))
      await api.delete(`${ROTA_API}/${id}`);
=======
      // ⚠️ Ajuste a Rota: /v1/api/pet/${id}
      await api.delete(`/v1/api/pet/${id}`);
>>>>>>> 29efca2fde73e0a003e8a57d4913bed88a847845
    } catch (error) {
      console.error("Erro ao deletar pet:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default PetService;