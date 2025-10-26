import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import Frame1 from "../assets/Frame1.png";

const TipoCadastro = () => {
  const navigate = useNavigate();

  const handleSelectAdotante = () => {
    navigate('/adotante-form');
  };

  const handleSelectOng = () => {
    navigate('/ong-form');
  };

  const handleBack = () => {
    navigate(-1); // Voltar para a página anterior
  };

  return (
<div className="w-full relative flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 text-[#333]">
  {/* Botão Voltar */}
  <button
    onClick={handleBack}
    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-black rounded-lg hover:bg-gray-200 transition-colors z-50"
  >
    <FaArrowLeft size={20} />
    <span className="text-lg font-medium">Voltar</span>
  </button>

  <div className="w-full max-w-[500px] max-w-[700px] sm:max-w-[400px] xl:max-w-[420px] min-w-[280px] p-0 animate-slideIn z-10">
    {/* Logo e título */}
    <div className="flex flex-col items-center mb-7">
      <h1 className="text-6xl font-bold">PetMatch</h1>
      <img src={Frame1} alt="Logo PetMatch" className="max-w-[200px] mt-2.5" />
    </div>

    <h2 className="text-2xl font-bold text-center mb-2">Escolha o tipo de cadastro</h2>
    <p className="text-sm font-semibold text-center mb-6">
      Clique no tipo correspondente para prosseguir
    </p>

    {/* Botões de seleção */}
    <div className="flex flex-col gap-4 ">
      <button
        onClick={handleSelectAdotante}
        className="w-full py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
      >
        Adotante
      </button>

      <button
        onClick={handleSelectOng}
        className="w-full py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
      >
        ONG
      </button>
    </div>
  </div>
</div>
  );
};

export default TipoCadastro;