import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaListOl, FaPlusCircle, FaChartBar, FaUsers } from 'react-icons/fa'; // Adicionei mais ícones para futuras expansões

const OngHome = () => {
  return (
    // Replicando o fundo do LoginScreen
    <div
      className="w-full flex flex-col items-center justify-center min-h-screen p-5 sm:p-10 md:p-10 text-[#333]"
      style={{
        background: "linear-gradient(to bottom, #FFE680, #FFF5CC)", // Gradiente de fundo
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2017/01/31/20/26/paw-print-2027703_1280.png')", // Imagem de patinhas
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        backgroundBlendMode: "soft-light", // Blend para a imagem de fundo
      }}
    >
      {/* Card principal com blur e sombra, similar ao LoginScreen */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-8 sm:p-10 w-full max-w-[900px] text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-black mb-4 drop-shadow-md">
          Painel da ONG PetMatch
        </h1>
        <p className="text-lg text-gray-700 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Bem-vindo(a)! Gerencie seus animaizinhos e as adoções de forma eficiente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Card 1: Gerenciar Animais */}
          <Link
            to="/adotar"
            className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 border border-gray-100 flex flex-col items-center text-center group"
          >
            <FaPaw className="text-5xl text-indigo-500 mb-3 group-hover:text-indigo-700 transition-colors duration-300" />
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-black mb-1">Gerenciar Animais</h2>
            <p className="text-gray-600 text-sm">Visualize, edite e cadastre novos pets para adoção.</p>
          </Link>

          {/* Card 2: Fila de Adoção */}
          <Link
            to="/ong/fila-adocao"
            className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 border border-gray-100 flex flex-col items-center text-center group"
          >
            <FaListOl className="text-5xl text-green-500 mb-3 group-hover:text-green-700 transition-colors duration-300" />
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-black mb-1">Fila de Adoção</h2>
            <p className="text-gray-600 text-sm">Acompanhe e gerencie os interessados nos seus pets.</p>
          </Link>

          {/* Novo Card: Cadastrar Novo Animal (Exemplo de expansão) */}
          <Link
            to="/adotar/novo" // Crie esta rota se for usar
            className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 border border-gray-100 flex flex-col items-center text-center group"
          >
            <FaPlusCircle className="text-5xl text-blue-500 mb-3 group-hover:text-blue-700 transition-colors duration-300" />
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-black mb-1">Cadastrar Animal</h2>
            <p className="text-gray-600 text-sm">Adicione um novo amiguinho à sua lista de adoção.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OngHome;