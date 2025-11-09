import React from 'react';
import { FaPlusCircle } from 'react-icons/fa'; 
// Caminho do logo: src/shared/components -> ../../features/splash/assets/Frame1.png
import Logo from '../../features/splash/assets/Frame1.png'; 

function AddPetCard({ onAddPetClick }) {
  return (
    // Estilo vertical (igual ao PetCard) com foco em ação
    <div className="bg-white shadow-xl rounded-xl overflow-hidden w-64 h-[400px] flex flex-col items-center justify-center p-4 mx-auto my-4 
                    border border-gray-200 border-dashed transition duration-300 transform group 
                    hover:shadow-2xl hover:scale-105 cursor-pointer"
         onClick={onAddPetClick}> 
      
      {/* Imagem do Logo */}
      <div className="flex-shrink-0 mb-4">
        <img 
          src={Logo} 
          alt="Adicionar Novo Pet" 
          className="h-24 w-24 object-contain" 
        />
      </div>

      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
        Adicionar Novo Animal
      </h2>
      
      <button 
        onClick={onAddPetClick}
        className="w-full max-w-xs px-4 py-2 bg-yellow-500 text-white 
                   font-semibold rounded-lg shadow-md 
                   hover:bg-yellow-600 transition duration-300 
                   focus:outline-none focus:ring-4 focus:ring-yellow-300 flex items-center justify-center gap-2"
      >
        <FaPlusCircle /> Cadastrar Pet
      </button>
    </div>
  );
}

export default AddPetCard;