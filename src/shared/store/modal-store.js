// src/store/useStatusModalStore.js
import { create } from 'zustand';

// Tipos de status que o modal pode exibir
export const StatusType = {
  LOADING: 'loading',
  OK: 'ok',
  FAIL: 'fail',
};

const initialState = {
  isOpen: false,
  message: '',
  statusType: StatusType.LOADING, // default
};

export const useStatusModalStore = create((set) => ({
  ...initialState,

  /**
   * Abre o modal com um status e mensagem específicos.
   * @param {string} message - A mensagem a ser exibida.
   * @param {StatusType} statusType - O tipo de animação/status ('loading', 'ok', 'fail').
   */
  openModal: (message, statusType) => set({
    isOpen: true,
    message: message,
    statusType: statusType,
  }),

  // Fecha o modal e reseta o estado.
  closeModal: () => set(initialState),



  // Funções de atalho (opcional, mas útil)
  showLoading: (message = 'Processando...') => useStatusModalStore.getState().openModal(message, StatusType.LOADING),
  showSuccess: (message = 'Sucesso!') => useStatusModalStore.getState().openModal(message, StatusType.OK),
  showError: (message = 'Ocorreu um erro.') => useStatusModalStore.getState().openModal(message, StatusType.FAIL),
}));