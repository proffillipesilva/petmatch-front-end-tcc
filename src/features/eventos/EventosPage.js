import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventoService from './services/EventoService';
import CardEvento from './components/CardEvento';
import { FaPlus } from 'react-icons/fa';
// --- ⚠️ 1. IMPORTE O 'useAuth' ---
import { useAuth } from '../../shared/context/AuthContext';

const EventosPage = () => {
  const navigate = useNavigate();
  // --- ⚠️ 2. PEGUE O USUÁRIO LOGADO ---
  const { user } = useAuth(); // (Seu context usa 'user.tipo')

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarEventos = async () => {
    try {
      setLoading(true);
      setError(null);
      // (Lembre-se que seu service chama 'getEventos')
      const data = await EventoService.getEventos();
      setEventos(data);
    } catch (err) {
      setError("Falha ao carregar eventos. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      try {
        // (Lembre-se que seu service chama 'deletarEvento')
        await EventoService.deletarEvento(id);
        setEventos(eventos.filter(evento => evento.id !== id));
      } catch (err) {
        console.error("Erro ao excluir evento:", err);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center">
          Eventos Cadastrados
        </h1>

        {/* --- ⚠️ 3. ADICIONE A CONDIÇÃO AQUI --- */}
        {/* Mostra o botão "+ Novo Evento" SÓ SE for ONG */}
        {user && user.tipo === 'ONG' && (
          <button
            onClick={() => navigate('/eventos/novo')}
            className="flex items-center gap-2 px-5 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors"
          >
            <FaPlus />
            Novo Evento
          </button>
        )}
      </div>

      {loading && <p className="text-center text-lg">Carregando eventos...</p>}
      {error && <p className="text-center text-lg text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {eventos.length === 0 ? (
            <p className="text-center text-lg text-gray-600">
              Nenhum evento cadastrado ainda.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {eventos.map(evento => (
                // --- ⚠️ 4. PASSE A PERMISSÃO PARA O CARD ---
                <CardEvento
                  key={evento.id}
                  evento={evento}
                  onDeletar={handleDeletar}
                  // Informa ao card se deve mostrar os controles (botão de lixo)
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

export default EventosPage;