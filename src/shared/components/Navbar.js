import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaPaw, FaStar, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Navbar = ({ onNavigate, userName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const welcomeMessage = userName ? `Olá, ${userName}` : "Bem-vindo(a)";

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // fecha o menu
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          onClick={() => onNavigate("inicio")}
          className="font-bold text-xl text-gray-800 cursor-pointer"
        >
          PetMatch
        </div>

        {/* Links principais */}
        <nav className="flex items-center gap-6 text-gray-700">
          <button
            onClick={() => onNavigate("inicio")}
            className="flex items-center gap-2 hover:text-yellow-500 transition"
          >
            <FaHome /> Início
          </button>

          <button
            onClick={() => onNavigate("adotar")}
            className="flex items-center gap-2 hover:text-yellow-500 transition"
          >
            <FaPaw /> Adotar
          </button>

          <button
            onClick={() => onNavigate("novidades")}
            className="flex items-center gap-2 hover:text-yellow-500 transition"
          >
            <FaStar /> Novidades
          </button>
        </nav>

        {/* Usuário */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-yellow-500"
          >
            <FaUserCircle size={24} />
            <span>{welcomeMessage}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              {!userName ? (
                <>
                  <button
                    onClick={() => onNavigate("login")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => onNavigate("tipoCadastro")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Cadastra-se
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate("sair")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <FaSignOutAlt className="inline mr-2" />
                  Sair
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;