import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetService from './services/PetService';   // 🐾
import CardPet from './components/CardPet';     // 🐾
import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../../shared/context/AuthContext';

const PetsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Pega o usuário logado

  const [pets, setPets] = useState([]); // 🐾
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarPets = async () => { // 🐾
    try {
      setLoading(true);
      setError(null);
      const data = await PetService.getPets(); // 🐾
      setPets(data); // 🐾
    } catch (err) {
      setError("Falha ao carregar pets. Tente novamente mais tarde."); // 🐾
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPets(); // 🐾
  }, []);

  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este pet?")) { // 🐾
      try {
        await PetService.deletarPet(id); // 🐾
        setPets(pets.filter(pet => pet.id !== id)); // 🐾
      } catch (err) {
        console.error("Erro ao excluir pet:", err); // 🐾
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center">
          Pets para Adoção {/* 🐾 */}
        </h1>

        {/* Mostra o botão "+ Novo Pet" SÓ SE for ONG */}
        {user && user.tipo === 'ONG' && (
          <button
<<<<<<< HEAD
            onClick={() => navigate('/adotar/novo')} // 🐾 (Já estava correto)
=======
            onClick={() => navigate('/pets/novo')} // 🐾
>>>>>>> 29efca2fde73e0a003e8a57d4913bed88a847845
            className="flex items-center gap-2 px-5 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors"
          >
            <FaPlus />
            Novo Pet {/* 🐾 */}
          </button>
        )}
      </div>

      {loading && <p className="text-center text-lg">Carregando pets...</p>}
      {error && <p className="text-center text-lg text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {pets.length === 0 ? (
            <p className="text-center text-lg text-gray-600">
              Nenhum pet cadastrado ainda. {/* 🐾 */}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {pets.map(pet => ( // 🐾
                <CardPet
                  key={pet.id}
                  pet={pet} // 🐾
                  onDeletar={handleDeletar}
                  // Informa ao card se deve mostrar os controles
                  showControls={user && user.tipo === 'ONG'}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PetsPage;