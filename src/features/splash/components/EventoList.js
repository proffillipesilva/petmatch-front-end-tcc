import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventoService from '../services/EventoService';


const formatarData = (dataString) => {
  if (!dataString) return "Data indefinida";
  try {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return "Data inválida";
  }
};

function EventoList() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  // Estados de loading e erro para a busca GET
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarEventos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await EventoService.listarEventos();
      setEventos(data);
    } catch (err) {
      // O 'api.js' vai mostrar o modal de erro
      setError("Falha ao carregar eventos. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os eventos quando o componente é montado
  useEffect(() => {
    carregarEventos();
  }, []);

  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      try {
        // O 'api.js' vai mostrar loading/success/error
        await EventoService.deletarEvento(id);
        // Atualiza a lista localmente após o sucesso
        setEventos(eventos.filter(evento => evento.id !== id));
      } catch (err) {
        // O 'api.js' já mostrou o modal de erro
        console.error("Erro ao excluir evento:", err);
      }
    }
  };

  return (
    // Estilo simples para combinar com o 'NovidadesScreen'
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Eventos Cadastrados</h1>
        <button
          onClick={() => navigate('/eventos/novo')} // Rota para o formulário
          style={{
            padding: '10px 15px',
            fontSize: '1rem',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          + Novo Evento
        </button>
      </div>

      {loading && <p>Carregando eventos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {eventos.length === 0 ? (
            <p>Nenhum evento cadastrado ainda.</p>
          ) : (
            eventos.map(evento => (
              <div key={evento.id} style={{
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ fontSize: '1.5rem', margin: '0 0 10px 0' }}>{evento.nome}</h2>
                <p style={{ margin: '5px 0' }}>
                  <strong>Data:</strong> {formatarData(evento.dataHora)}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>Local:</strong> {evento.endereco}
                </p>
                <button 
                  onClick={() => handleDeletar(evento.id)}
                  style={{
                    marginTop: '10px',
                    padding: '5px 10px',
                    fontSize: '0.9rem',
                    backgroundColor: '#E53E3E', // Vermelho
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Excluir
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default EventoList;