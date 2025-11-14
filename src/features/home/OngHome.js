import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaListOl } from 'react-icons/fa'; // Ícones para os cards

const OngHome = () => {
  return (
    <div className="container mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Painel de Controle da ONG</h1>
      <p className="text-lg text-gray-700 mb-8">
        Bem-vindo(a) ao seu painel. Use os links abaixo para gerenciar suas atividades.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Gerenciar Animais (Linka para a página que já existe) */}
        <Link 
          to="/adotar" 
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <FaPaw className="text-4xl text-indigo-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Gerenciar Animais</h2>
              <p className="text-gray-600 mt-1">Veja sua lista, edite e cadastre novos pets.</p>
            </div>
          </div>
        </Link>

        {/* Card 2: Fila de Adoção (Linka para a NOVA página) */}
        <Link 
          to="/ong/fila-adocao" // <-- Nossa nova rota
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <FaListOl className="text-4xl text-green-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Fila de Adoção</h2>
              <p className="text-gray-600 mt-1">Veja quem deu "Match" e gerencie a fila de espera.</p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default OngHome;