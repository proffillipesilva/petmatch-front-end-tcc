import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PetService from '../services/PetService'; // 🐾 Ajuste o caminho (../)
import { 
  FaArrowLeft, 
  FaPaw, 
  FaRulerVertical, 
  FaBirthdayCake,
  FaFileAlt // Ícone para descrição
} from 'react-icons/fa';

const PetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = React.useState(null); // 🐾

  React.useEffect(() => {
    // Busca o pet específico
    PetService.getPetById(id).then(data => { // 🐾
      setPet(data); // 🐾
    }).catch(err => {
      console.error(err);
      navigate('/pets'); // 🐾 Se não encontrar, volta para a lista
    });
  }, [id, navigate]);

  if (!pet) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-600">Carregando Pet...</h2>
      </div>
    );
  }

  return (
    // Estilo da página de detalhes
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-10">
      <button 
        onClick={() => navigate('/pets')} // 🐾 Volta para a lista
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
      >
        <FaArrowLeft />
        Voltar para os Pets
      </button>

      <div className="flex flex-col">
        <img 
          src={pet.imagemUrl || 'https://via.placeholder.com/800x400?text=Pet'} 
          alt={pet.nome} 
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
        />
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {pet.nome}
        </h1>
        
        {/* Descrição vinda do backend */}
        <p className="text-xl text-gray-600 mb-6">
          {pet.descricao || "Este pet ainda não tem uma descrição detalhada."}
        </p>

        {/* Bloco de Informações */}
        <div className="space-y-4">
          <div className="flex items-center text-gray-900 p-4 bg-gray-100 rounded-lg">
            <FaPaw className="mr-3 text-2xl text-indigo-600" />
            <span className="text-xl font-medium">
              Espécie: <span className="font-bold">{pet.especie}</span>
            </span>
          </div>
          
          <div className="flex items-center text-gray-900 p-4 bg-gray-100 rounded-lg">
            <FaRulerVertical className="mr-3 text-2xl text-indigo-600" />
            <span className="text-xl font-medium">
              Porte: <span className="font-bold">{pet.porte}</span>
            </span>
          </div>

          <div className="flex items-center text-gray-900 p-4 bg-gray-100 rounded-lg">
            <FaBirthdayCake className="mr-3 text-2xl text-indigo-600" />
            <span className="text-xl font-medium">
              Idade: <span className="font-bold">{pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}</span>
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PetPage;