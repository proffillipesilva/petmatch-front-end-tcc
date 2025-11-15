import React, { useState } from 'react'; // <-- Importa useState
import { Link } from "react-router-dom";
import { FaTrash, FaPaw, FaRulerVertical, FaBirthdayCake, FaHeart } from 'react-icons/fa'; // <-- Importa FaHeart
import { useAuth } from '../../../shared/context/AuthContext'; // <-- Importa useAuth
import PetService from '../services/PetService'; // <-- Importa PetService

// --- MUDANÇA: Adicione uma imagem padrão ---
// (Substitua pelo caminho de uma imagem placeholder que você tenha)
const IMAGEM_PADRAO = "https://i.imgur.com/7b71Ymw.png"; // Exemplo

const CardPet = ({ pet, onDeletar, showControls }) => {

  const { user } = useAuth(); // <-- (PRESERVADO)
  const isAdotante = user && user.tipo !== 'ONG'; // <-- (PRESERVADO)
  
  const [isMatched, setIsMatched] = useState(false); // <-- (PRESERVADO)

  // --- MUDANÇA: Lógica para pegar a URL da imagem ---
  const fotos = pet.fotosAnimais;
  const imageUrl = (fotos && fotos.length > 0 && fotos[0].url) 
    ? fotos[0].url 
    : IMAGEM_PADRAO;
  // --- FIM DA MUDANÇA ---

  const handleDeleteClick = (e) => { // <-- (PRESERVADO)
    e.preventDefault(); 
    onDeletar(pet.id);
  };

  const handleMatchClick = async (e) => { // <-- (PRESERVADO)
    e.preventDefault(); 
    e.stopPropagation(); 

    if (isMatched) return; 

    try {
      await PetService.registrarInteresse(pet.id);
      setIsMatched(true);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Erro ao registrar.";
      if (errorMsg.includes("Usuário já está na fila")) {
        setIsMatched(true); 
      } else {
        console.error(errorMsg);
      }
    }
  };

  // (PRESERVADO) - O Link envolve todo o card
  return (
    <Link to={`/adotar/${pet.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      
      <img 
        src={imageUrl} 
        alt={pet.nome} 
        className="w-full h-56 object-contain" // <-- ✨ MUDANÇA AQUI
      />
      
      <div className="p-4 relative">
        {/* (PRESERVADO) - Botão de Deletar (para ONG) */}
        {showControls && (
          <button
            onClick={handleDeleteClick}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            aria-label="Deletar pet"
          >
            <FaTrash size={14} />
          </button>
        )}

        {/* (PRESERVADO) - Botão de Match (para Adotante) */}
        {isAdotante && (
          <button
            onClick={handleMatchClick}
            disabled={isMatched}
            className={`absolute top-2 right-2 p-2 rounded-full transition ${
              isMatched 
                ? "bg-red-500 text-white cursor-not-allowed" 
                : "bg-white text-red-500 hover:bg-red-100"
            }`}
            aria-label="Registrar interesse"
          >
            <FaHeart size={16} />
          </button>
        )}
        
        {/* (PRESERVADO) - Informações do Pet */}
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{pet.nome}</h3>
        <p className="text-gray-600 mb-3">{pet.especie}</p>

        {/* (PRESERVADO) - Ícones */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
          <span className="flex items-center gap-1.5"><FaPaw /> {pet.raca}</span>
          <span className="flex items-center gap-1.5"><FaRulerVertical /> {pet.porte}</span>
          <span className="flex items-center gap-1.5"><FaBirthdayCake /> {pet.idade} anos</span>
        </div>
      </div>
    </Link>
  );
};

export default CardPet;