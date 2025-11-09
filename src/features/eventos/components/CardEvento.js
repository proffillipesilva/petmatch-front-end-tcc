import React from 'react';
import { Link } from "react-router-dom";
import { FaTrash, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

// Peguei a função 'formatarData' do seu EventoList.js
const formatarData = (dataString) => {
  if (!dataString) return "Data indefinida";
  try {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return "Data inválida";
  }
};

// --- ⚠️ 1. ADICIONE 'showControls' NAS PROPS ---
const CardEvento = ({ evento, onDeletar, showControls }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault(); // Impede a navegação do <Link>
    onDeletar(evento.id);
  };

  return (
    <Link to={`/eventos/${evento.id}`} className="block">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-[1.02] relative">

        {/* --- ⚠️ 2. ADICIONE A CONDIÇÃO AQUI --- */}
        {/* Mostra o botão de lixo SÓ SE 'showControls' for verdadeiro */}
        {showControls && (
          <button
            onClick={handleDeleteClick}
            className="absolute top-3 right-3 z-10 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            aria-label="Excluir evento"
          >
            <FaTrash size={14} />
          </button>
        )}

        {/* O resto do card é igual */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 truncate pr-10">
            {evento.nome}
          </h3>

          <div className="flex items-center text-gray-700 mb-2">
            <FaCalendarAlt className="mr-2 text-indigo-600" />
            <span className="text-md font-medium">
              {formatarData(evento.dataHora)}
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-indigo-600" />
            <span className="text-md">
              {evento.endereco}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardEvento;