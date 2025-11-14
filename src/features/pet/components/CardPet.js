import React, { useState } from 'react'; // <-- Importa useState
import { Link } from "react-router-dom";
import { FaTrash, FaPaw, FaRulerVertical, FaBirthdayCake, FaHeart } from 'react-icons/fa'; // <-- Importa FaHeart
import { useAuth } from '../../../shared/context/AuthContext'; // <-- Importa useAuth
import PetService from '../services/PetService'; // <-- Importa PetService

// Card para Pet (baseado no CardEvento)
const CardPet = ({ pet, onDeletar, showControls }) => {

  const { user } = useAuth(); // <-- Pega o usuário
  const isAdotante = user && user.tipo !== 'ONG';
  
  // Estado para feedback visual imediato no card
  const [isMatched, setIsMatched] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault(); // Impede a navegação do <Link>
    onDeletar(pet.id);
  };

  // ****** ⬇️ NOVA FUNÇÃO DE MATCH NO CARD ⬇️ ******
  const handleMatchClick = async (e) => {
    e.preventDefault(); // Impede a navegação do <Link>
    e.stopPropagation(); // Impede a propagação do evento

    if (isMatched) return; // Não permite clicar de novo

    try {
      await PetService.registrarInteresse(pet.id);
      setIsMatched(true);
      // Aqui, o ideal seria um "toast" (popup de notificação)
      // Como não temos, apenas o feedback visual do botão já ajuda.
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Erro ao registrar.";
      if (errorMsg.includes("Usuário já está na fila")) {
        setIsMatched(true); // Se já está na fila, marca como "matched"
      } else {
        // Poderia mostrar um toast de erro
        console.error(errorMsg);
      }
    }
  };
  // ****** ⬆️ FIM DA NOVA FUNÇÃO ⬆️ ******

  // Placeholder se não tiver imagem
  const imagem = pet.imagemUrl || 'https://via.placeholder.com/400x300?text=Pet';

  return (
    // ****** ⬇️ CORREÇÃO APLICADA AQUI ⬇️ ******
    <Link to={`/adotar/${pet.id}`} className="block"> {/* 🐾 Rota do Pet (era /pets/) */}
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

        {/* ****** ⬇️ NOVO BOTÃO DE MATCH (ADOTANTE) ⬇️ ****** */}
        {isAdotante && (
          <button
            onClick={handleMatchClick}
            disabled={isMatched}
            className={`absolute top-3 ${showControls ? 'right-14' : 'right-3'} z-10 p-2 rounded-full transition-all duration-200 ${
              isMatched
                ? 'bg-red-500 text-white scale-110' // Estado "Match"
                : 'bg-white text-red-500 hover:bg-red-100' // Estado Padrão
            }`}
            aria-label="Registrar interesse (Match)"
          >
            <FaHeart size={14} />
          </button>
        )}
        {/* ****** ⬆️ FIM DO BOTÃO DE MATCH ⬆️ ****** */}


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