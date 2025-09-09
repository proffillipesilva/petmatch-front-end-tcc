// src/features/home/components/OngHome.jsx
import React from "react";

const OngHome = ({ user }) => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-2">Bem-vindo, {user?.nomeOng}</h1>
      <p className="text-gray-600 mb-6">
        Painel da ONG — gerencie seus animais e cadastros.
      </p>
      <div className="mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Gerenciar Animais
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg ml-4 hover:bg-green-700">
          Ver Cadastros
        </button>
      </div>
    </div>
  );
};

export default OngHome;
