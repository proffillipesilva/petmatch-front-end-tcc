// src/components/StatusModal.jsx
import React from 'react';
import { useStatusModalStore, StatusType } from '../store/modal-store';
import StatusAnimation from './StatusAnimation'; // Importe o componente de animação

const StatusModal = () => {
  // Pega o estado e a função closeModal do store Zustand
  const { isOpen, message, statusType, closeModal } = useStatusModalStore();

  if (!isOpen) {
    return null;
  }

  // Define a cor de fundo e a cor do texto do botão com base no status
  let buttonColorClass = '';
  switch (statusType) {
    case StatusType.OK:
      buttonColorClass = 'bg-green-500 hover:bg-green-600';
      break;
    case StatusType.FAIL:
      buttonColorClass = 'bg-red-500 hover:bg-red-600';
      break;
    default:
      // Para LOADING, geralmente não há botão de fechar, mas vamos deixar um
      buttonColorClass = 'bg-gray-500 hover:bg-gray-600';
      break;
  }
  
  // Condição para esconder o botão 'Fechar' no estado de LOADING
  const showCloseButton = statusType !== StatusType.LOADING;

  return (
    // Backdrop Fixo: Fundo escuro que cobre toda a tela
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Container do Modal: Centro da tela */}
      <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-sm transform transition-all duration-300 scale-100 opacity-100">
        
        <div className="flex flex-col items-center space-y-4">
          
          {/* 1. Animação/Ícone */}
          <StatusAnimation statusType={statusType} />
          
          {/* 2. Mensagem */}
          <p className="text-center text-lg font-medium text-gray-700">{message}</p>
          
          {/* 3. Botão de Fechar (se não for loading) */}
          {showCloseButton && (
            <button
              onClick={closeModal}
              className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-150 ${buttonColorClass} focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              Fechar
            </button>
          )}

          {/* Opcional: Se for loading, pode-se desabilitar a interação
          com a função closeModal no backdrop, mas o botão não aparece. */}
        </div>
      </div>
    </div>
  );
};

export default StatusModal;