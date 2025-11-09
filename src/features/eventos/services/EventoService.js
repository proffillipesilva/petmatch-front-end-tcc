import api from "../../../shared/utils/api";

/**
 * Payload (corpo da requisição) para criar um evento.
 * @typedef {object} CriarEventoPayload
 * @property {string} nome
 * @property {string} dataHora - Formato ISO (ex: "2024-12-31T19:00:00")
 * @property {string} endereco
 * @property {string} idOng - (UUID) O ID da ONG que está criando o evento.
 */

/**
 * Resposta da API ao criar ou buscar um evento.
// ... (o resto do arquivo permanece o mesmo) ...
 */
const listarEventos = async () => {
  // ... (código existente) ...
  try {
    const response = await api.get("/v1/api/eventos");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar eventos:", error.response?.data || error.message);
    throw error; 
  }
};

/**
 * Cria um novo evento.
 * @param {CriarEventoPayload} payload Os dados do evento a ser criado.
 * @returns {Promise<EventoResponse>} O evento criado.
 */
const criarEvento = async (payload) => {
  // ... (código existente) ...
  try {
    const response = await api.post("/v1/api/eventos", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar evento:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Deleta um evento pelo ID.
// ... (o resto do arquivo permanece o mesmo) ...
 */
const deletarEvento = async (id) => {
  // ... (código existente) ...
  try {
    await api.delete(`/v1/api/eventos/${id}`);
  } catch (error) {
    console.error("Erro ao deletar evento:", error.response?.data || error.message);
    throw error;
  }
};

const EventoService = {
  /**
   * Busca a lista de todos os eventos.
   * (Seu arquivo antigo chamava de 'listarEventos', mudei para 'getEventos'
   * para seguir o padrão 'get' do professor, mas 'listarEventos' também funciona)
   */
  async getEventos() {
    try {
      const response = await api.get("/v1/api/eventos");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar eventos:", error.response?.data || error.message);
      throw error;
    }
  },
/**
   * (NOVA FUNÇÃO - A PARTIR DO EXEMPLO DO PROFESSOR)
   * Busca os detalhes de um único evento pelo ID.
   */
  async getEventoById(id) {
    try {
      const response = await api.get(`/v1/api/eventos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar evento por ID:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * (FUNÇÃO DO SEU 'EventoForm.js')
   * Cria um novo evento.
   */
  async criarEvento(payload) {
    try {
      const response = await api.post("/v1/api/eventos", payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar evento:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * (FUNÇÃO DO SEU 'EventoList.js')
   * Deleta um evento pelo ID.
   */
  async deletarEvento(id) {
    try {
      await api.delete(`/v1/api/eventos/${id}`);
    } catch (error) {
      console.error("Erro ao deletar evento:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default EventoService;