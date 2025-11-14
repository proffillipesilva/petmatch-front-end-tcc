import api from "../../../../shared/utils/api";

// Rota base para as ações de adoção
const ROTA_ADOCAO = "/v1/api/adocao";

const AdocaoService = {
  
  /**
   * Busca a lista de interessados (fila de espera) para um animal.
   * Chama: GET /v1/api/adocao/animal/{animalId}/lista-espera
   * @param {string} animalId O UUID do animal
   */
  async getInteressados(animalId) {
    try {
      const response = await api.get(`${ROTA_ADOCAO}/animal/${animalId}/lista-espera`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar interessados para ${animalId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Avalia um interesse (Aprova ou Rejeita).
   * Chama: PUT /v1/api/adocao/interesse/{interesseId}/avaliar
   * @param {string} interesseId O UUID do registro de interesse
   * @param {'APROVADO' | 'REJEITADO'} status O novo status
   */
  async avaliarInteresse(interesseId, status) {
    try {
      // O backend espera um JSON no corpo: { "status": "APROVADO" }
      const payload = { status: status.toUpperCase() }; 
      const response = await api.put(`${ROTA_ADOCAO}/interesse/${interesseId}/avaliar`, payload);
      return response.data;
    } catch (error) {
        console.error(`Erro ao avaliar interesse ${interesseId}:`, error.response?.data || error.message);
        throw error;
      }
    }
};

export default AdocaoService;