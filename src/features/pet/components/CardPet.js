import React from 'react';
import { Link } from "react-router-dom";
import { FaTrash, FaPaw, FaRulerVertical, FaBirthdayCake } from 'react-icons/fa';

// Card para Pet (baseado no CardEvento)
const CardPet = ({ pet, onDeletar, showControls }) => {
  
  const handleDeleteClick = (e) => {
    e.preventDefault(); // Impede a navegação do <Link>
    onDeletar(pet.id);
  };

  // Placeholder se não tiver imagem
  const imagem = pet.imagemUrl || 'https://via.placeholder.com/400x300?text=Pet';

  return (
    <Link to={`/pets/${pet.id}`} className="block"> {/* 🐾 Rota do Pet */}
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-[1.02] relative">

        {/* Botão de deletar (lógica idêntica) */}
        {showControls && (
          <button
            onClick={handleDeleteClick}
            className="absolute top-3 right-3 z-10 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            aria-label="Excluir pet"
          >
            <FaTrash size={14} />
          </button>
        )}

        {/* Imagem do Pet */}
        <img 
          src={imagem} 
          alt={pet.nome} 
          className="w-full h-48 object-cover" 
        />

        {/* Conteúdo do Card */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 truncate pr-10">
            {pet.nome}
          </h3>

          <div className="flex items-center text-gray-700 mb-2">
            <FaPaw className="mr-2 text-indigo-600" />
            <span className="text-md font-medium">
              {pet.especie}
            </span>
          </div>

          <div className="flex items-center text-gray-600 mb-2">
            <FaRulerVertical className="mr-2 text-indigo-600" />
            <span className="text-md">
              {pet.porte}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <FaBirthdayCake className="mr-2 text-indigo-600" />
            <span className="text-md">
              {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default CardPet;