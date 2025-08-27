import React, { useState } from 'react';
import {
  FaHome,
  FaPaw,
  FaStar,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
} from 'react-icons/fa';

const SidebarMenu = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão hamburger fixo no canto superior esquerdo */}
      <button
        className="fixed top-4 left-4 z-20 text-2xl text-gray-800 bg-white/80 rounded-md p-2 shadow-md hover:bg-gray-200 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar que aparece e desaparece */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col p-5 z-10 transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Topo - Usuário */}
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className="text-5xl text-gray-700" />
          <span className="mt-2 font-semibold text-lg">Usuário</span>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-3 text-gray-800">
          <button
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-3 hover:bg-gray-200 px-4 py-2 rounded transition"
          >
            <FaHome />
            Início
          </button>

          <button
            onClick={() => onNavigate('adotar')}
            className="flex items-center gap-3 hover:bg-gray-200 px-4 py-2 rounded transition"
          >
            <FaPaw />
            Adotar
          </button>

          <button
            onClick={() => onNavigate('novidades')}
            className="flex items-center gap-3 hover:bg-gray-200 px-4 py-2 rounded transition"
          >
            <FaStar />
            Novidades
          </button>

          <button
            onClick={() => onNavigate('sair')}
            className="flex items-center gap-3 hover:bg-gray-200 px-4 py-2 rounded transition"
          >
            <FaSignOutAlt />
            Sair
          </button>
        </nav>
      </aside>
    </>
  );
};

export default SidebarMenu;
