import api from "../../../shared/utils/api";

/**
 * Payload (corpo da requisição) para criar um evento.
 * @typedef {object} CriarEventoPayload
 * @property {string} nome
 * @property {string} dataHora - Formato ISO (ex: "2024-12-31T19:00:00")
 * @property {string} endereco
 */

/**
 * Resposta da API ao criar ou buscar um evento.
 * @typedef {object} EventoResponse
 * @property {string} id - (UUID)
 * @property {string} nome
 * @property {string} dataHora
 * @property {string} endereco
 * @property {string} idOng - (UUID)
 */

/**
 * Busca todos os eventos cadastrados.
 * @returns {Promise<EventoResponse[]>} Uma lista de eventos.
 */
const listarEventos = async () => {
  // O interceptor de 'api.js' NÃO mostra 'loading' para GET, o que é ótimo.
  // Ele só mostrará um modal se der ERRO.
  try {
    const response = await api.get("/v1/api/eventos");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar eventos:", error.response?.data || error.message);
    throw error; // Deixa o interceptor lidar com a exibição do erro
  }
};

/**
 * Cria um novo evento.
 * @param {CriarEventoPayload} payload Os dados do evento a ser criado.
 * @returns {Promise<EventoResponse>} O evento criado.
 */
const criarEvento = async (payload) => {
  // O interceptor de 'api.js' VAI mostrar 'loading' e 'success/error'.
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
 * @param {string} id O ID (UUID) do evento a ser deletado.
 * @returns {Promise<void>}
 */
const deletarEvento = async (id) => {
  // O interceptor de 'api.js' VAI mostrar 'loading' e 'success/error'.
  try {
    await api.delete(`/v1/api/eventos/${id}`);
  } catch (error) {
    console.error("Erro ao deletar evento:", error.response?.data || error.message);
    throw error;
  }
};

const EventoService = {
  listarEventos,
  criarEvento,
  deletarEvento,
};

export default EventoService;