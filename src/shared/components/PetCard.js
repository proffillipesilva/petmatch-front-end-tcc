import React from 'react';
import AuthImg from '../../features/splash/assets/Auth.png';

/**
 * Componente de Card VERTICAL para um Pet.
 * Este componente exibe os dados de um pet e um botão para iniciar a adoção.
 * @param {object} props.pet - Dados do pet (ex: { id, nome, raca, idade, descricao, imagemUrl }).
 * @param {function} props.onAdotarClick - Função chamada ao clicar no botão 'Adotar'.
 */
function PetCard({ pet, onAdotarClick }) {
  
  const GENERIC_PET_PLACEHOLDER = 'https://via.placeholder.com/200x180/FBBF24/FFFFFF?text=PET';
  
  // Dados de exemplo (fallback)
  const petData = pet || { 
    id: 99, 
    nome: "Pet Genérico", 
    raca: "Raça Indefinida", 
    idade: "Idade Indefinida", 
    descricao: "Um amigo leal esperando por um lar amoroso.",
    imagemUrl: GENERIC_PET_PLACEHOLDER 
  };

  return (
    // Card Vertical: Fundo branco, sombra, cantos arredondados, largura definida (w-64)
    <div className="bg-white shadow-xl rounded-xl overflow-hidden w-64 h-[400px] flex flex-col mx-auto 
                    border border-gray-100 transition duration-300 transform group 
                    hover:shadow-2xl hover:scale-105">
      
      {/* Imagem do Pet (parte superior do card) */}
      <div className="w-full h-40 flex-shrink-0 relative">
        <img 
          className="h-full w-full object-cover transform group-hover:scale-105 transition duration-300" 
          src={petData.imagemUrl || GENERIC_PET_PLACEHOLDER} 
          alt={`Foto de ${petData.nome}`} 
        />
        {/* Badge de idade no canto superior esquerdo da imagem */}
        <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          {petData.idade}
        </span>
      </div>

      {/* Conteúdo do Card (Nome, Raça, Descrição) */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-900 leading-tight mb-1">{petData.nome}</h2>
        <p className="text-sm text-gray-500 mb-3">{petData.raca}</p>
        
        {/* Descrição com limite de linhas (Requer plugin @tailwindcss/line-clamp) */}
        <p className="text-gray-700 text-sm mb-4 flex-grow overflow-hidden text-ellipsis line-clamp-3">
          {petData.descricao}
        </p>
        
        {/* Botão ADOTAR (parte inferior do card) */}
        <div className="mt-auto flex justify-center">
          <button 
            onClick={() => onAdotarClick(petData.id)}
            className="w-full px-4 py-2 bg-yellow-500 text-white 
                       font-semibold rounded-lg shadow-md 
                       hover:bg-yellow-600 transition duration-300 
                       focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            ADOTAR
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default PetCard;