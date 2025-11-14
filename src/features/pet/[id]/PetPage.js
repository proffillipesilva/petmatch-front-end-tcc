import React, { useState } from 'react'; // <-- Importa o useState
import { useParams, useNavigate } from 'react-router-dom';
import PetService from '../services/PetService'; // 🐾 Ajuste o caminho (../)
import { useAuth } from '../../../shared/context/AuthContext';
import {
  FaArrowLeft,
  FaPaw,
  FaRulerVertical,
  FaBirthdayCake,
  FaFileAlt,
  FaHeart // <-- Importa o ícone de coração
} from 'react-icons/fa';

const PetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // <-- Pega o usuário logado
  const [pet, setPet] = React.useState(null); // 🐾

  // Estado para controlar o feedback do botão
  const [matchStatus, setMatchStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  React.useEffect(() => {
    // Busca o pet específico
    PetService.getPetById(id).then(data => { // 🐾
      setPet(data); // 🐾
    }).catch(err => {
      console.error(err);
      navigate('/adotar'); // 🐾 Se não encontrar, volta para a lista (Já estava correto)
    });
  }, [id, navigate]);

  // ****** ⬇️ NOVA FUNÇÃO PARA DAR MATCH ⬇️ ******
  const handleMatch = async () => {
    if (!pet) return;

    setMatchStatus({ loading: true, error: null, success: false });
    try {
      await PetService.registrarInteresse(pet.id);
      setMatchStatus({ loading: false, error: null, success: true });
    } catch (err) {
      // O backend já tem a lógica de duplicidade, vamos usá-la
      const errorMsg = err.response?.data?.message || err.message || "Erro ao registrar. Tente mais tarde.";
      
      if (errorMsg.includes("Usuário já está na fila")) {
        setMatchStatus({ loading: false, error: "Você já demonstrou interesse neste pet!", success: false });
      } else {
        setMatchStatus({ loading: false, error: errorMsg, success: false });
      }
    }
  };
  // ****** ⬆️ FIM DA NOVA FUNÇÃO ⬆️ ******

  if (!pet) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-600">Carregando Pet...</h2>
      </div>
    );
  }

  // Verifica se o usuário é um adotante
  const isAdotante = user && user.tipo !== 'ONG';

  return (
    // Estilo da página de detalhes
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-10">
      <button
        onClick={() => navigate('/adotar')} // 🐾 Volta para a lista (era /pets)
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

        {/* ****** ⬇️ NOVO BOTÃO DE MATCH AQUI ⬇️ ****** */}
        {isAdotante && (
          <div className="my-6">
            <button
              onClick={handleMatch}
              disabled={matchStatus.loading || matchStatus.success || matchStatus.error}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xl font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            >
              <FaHeart />
              {matchStatus.loading ? "Enviando..." : (matchStatus.success ? "Interesse Registrado!" : "Quero dar Match!")}
            </button>
            
            {/* Feedback para o usuário */}
            {matchStatus.error && (
              <p className="text-red-600 text-center mt-3 font-medium">{matchStatus.error}</p>
            )}
            {matchStatus.success && (
              <p className="text-green-600 text-center mt-3 font-medium">
                Interesse registrado com sucesso! A ONG foi notificada e você pode acompanhar na sua página de "Meus Interesses".
              </p>
            )}
          </div>
        )}
        {/* ****** ⬆️ FIM DO BOTÃO DE MATCH ⬆️ ****** */}


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