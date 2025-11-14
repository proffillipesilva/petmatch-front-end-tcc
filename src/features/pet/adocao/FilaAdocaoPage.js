import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../shared/context/AuthContext';
import PetService from '../services/PetService';
import AdocaoService from './service/AdocaoService';
import { FaPaw, FaUser, FaCheck, FaTimes, FaSpinner, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Componente para um único animal na lista
const AnimalInteresses = ({ pet }) => {
  const [interessados, setInteressados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const carregarInteressados = async () => {
    if (!pet.id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await AdocaoService.getInteressados(pet.id);
      setInteressados(data);
    } catch (err) {
      setError("Erro ao carregar a fila de espera.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleExpand = () => {
    const expand = !isExpanded;
    setIsExpanded(expand);
    // Só carrega a fila no primeiro "expandir"
    if (expand && interessados.length === 0 && !error) {
      carregarInteressados();
    }
  };

  const handleAvaliar = async (interesseId, novoStatus) => {
    const acao = novoStatus === 'APROVADO' ? 'aprovar' : 'rejeitar';
    // Usando o window.confirm que você usou em PetsPage.js
    if (!window.confirm(`Tem certeza que deseja ${acao} este candidato?`)) {
      return;
    }

    try {
      await AdocaoService.avaliarInteresse(interesseId, novoStatus);
      // Atualiza a lista, removendo o candidato
      setInteressados(prev => prev.filter(i => i.id !== interesseId));
    } catch (err) {
      alert(`Erro ao ${acao} candidato. Tente novamente.`);
    }
  };

  const filaVazia = interessados.length === 0 && !isLoading && !error;
  const temFila = interessados.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Header do Card do Animal (Clicável) */}
      <div 
        className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50"
        onClick={handleToggleExpand}
      >
        <div className="flex items-center gap-4">
          <img 
            src={pet.imagemUrl || 'https://via.placeholder.com/100'} 
            alt={pet.nome} 
            className="w-16 h-16 object-cover rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{pet.nome}</h3>
            <p className="text-gray-600">{pet.especie} - {pet.porte}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-indigo-600">
            {interessados.length} 
            <span className="text-sm font-normal text-gray-500"> pendente(s)</span>
          </span>
          {isLoading ? <FaSpinner className="animate-spin text-indigo-500" /> : (isExpanded ? <FaChevronUp /> : <FaChevronDown />)}
        </div>
      </div>

      {/* Lista de Interessados (Expandida) */}
      {isExpanded && (
        <div className="p-5 border-t border-gray-200">
          {isLoading && <p className="text-center text-gray-500">Carregando fila...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {filaVazia && <p className="text-center text-gray-500">Ninguém na fila de espera ainda.</p>}
          
          {temFila && (
            <ul className="space-y-4">
              {interessados.map(interesse => (
                <li 
                  key={interesse.id} 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-100 rounded-lg"
                >
                  {/* Dados do Adotante (Baseado no seu AdocaoServiceImpl) */}
                  <div className="flex items-center gap-3 mb-3 sm:mb-0">
                    <FaUser className="text-xl text-gray-500" />
                    <div>
                      {/* Estou assumindo que seu "InteresseResponseDTO" tem os campos 'adotanteNome' e 'adotanteEmail'.
                        Se os nomes forem diferentes (ex: 'nomeUsuario'), ajuste aqui. 
                      */}
                      {/* ****** ⬇️ CORREÇÃO APLICADA AQUI ⬇️ ****** */}
                      {/* O DTO usa 'nomeUsuario' e 'dataDeInteresse', como visto no InteresseResponseDTO.java */}
                      <p className="font-semibold text-gray-900">{interesse.nomeUsuario || "Nome não disponível"}</p>
                      <p className="text-sm text-gray-600">
                        {/* Formatando a data para exibição */}
                        Interesse em: {new Date(interesse.dataDeInteresse).toLocaleDateString('pt-BR')}
                      </p>
                      {/* ****** ⬆️ FIM DA CORREÇÃO ⬆️ ****** */}
                    </div>
                  </div>
                  {/* Botões de Ação */}
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => handleAvaliar(interesse.id, 'REJEITADO')}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                    >
                      <FaTimes />
                      Rejeitar
                    </button>
                    <button
                      onClick={() => handleAvaliar(interesse.id, 'APROVADO')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                    >
                      <FaCheck />
                      Aprovar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

// Componente Principal da Página
const FilaAdocaoPage = () => {
  const { user } = useAuth();
  const [meusPets, setMeusPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.id) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    const carregarMeusPets = async () => {
      try {
        const todosPets = await PetService.getPets();
        // Filtra os pets para mostrar APENAS os da ONG logada
        // PetForm.js envia 'idOng: user.id', então esta lógica deve funcionar
        const petsDaOng = todosPets.filter(pet => pet.idOng === user.id);
        setMeusPets(petsDaOng);
      } catch (err) {
        setError("Falha ao carregar seus animais.");
      } finally {
        setLoading(false);
      }
    };

    carregarMeusPets();
  }, [user]);

  if (loading) return <p className="text-center text-lg p-8">Carregando seus animais...</p>;
  if (error) return <p className="text-center text-lg text-red-600 p-8">{error}</p>;

  return (
    <div className="container mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Fila de Adoção</h1>
      <p className="text-lg text-gray-700 mb-8">
        Gerencie os interessados ("matches") para cada um dos seus animais. Clique em um animal para expandir a fila.
      </p>

      {meusPets.length === 0 && (
        <p className="text-center text-gray-600 bg-gray-100 p-6 rounded-lg">
          Você ainda não cadastrou nenhum animal. Cadastre um animal na tela "Gerenciar Animais" para ver a fila de espera aqui.
        </p>
      )}

      <div className="max-w-4xl mx-auto">
        {meusPets.map(pet => (
          <AnimalInteresses key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default FilaAdocaoPage;