// src/features/home/components/AdotanteHome.jsx
import React from "react";

const AdotanteHome = ({ user }) => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-2">Bem-vindo, {user?.nomeAdotante}</h1>
      <p className="text-gray-600 mb-6">
        Explore ONGs e encontre animais para adoção!
      </p>
      <div className="mt-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Procurar Animais
        </button>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg ml-4 hover:bg-pink-700">
          Meus Favoritos
        </button>
      </div>
    </div>
  );
};

export default AdotanteHome;
