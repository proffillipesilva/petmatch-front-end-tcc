import React from "react";
import { FaArrowLeft } from "react-icons/fa";

import Frame1 from "../../../images/Frame1.png";
import AuthImg from "../../../images/Auth.png";

const TipoCadastro = ({ onSelectAdotante, onSelectOng, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 bg-auth-pattern bg-cover bg-center bg-no-repeat text-[#333]">
      {/* Botão de Voltar fora do contêiner do formulário */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-black flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <FaArrowLeft size={20} />
        <span className="text-lg">Voltar</span>
      </button>

      <div className="w-full max-w-md sm:max-w-[400px] xl:max-w-[420px] min-w-[280px] p-0 animate-slideIn">
        <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl text-shadow">
          <h2 className="Frame1-title text-6xl font-bold">PetMatch</h2>
          <img src={Frame1} alt="Frame1" className="max-w-[200px] mt-2.5" />
        </div>

        <h2 className="flex flex-col items-center logo-title text-2xl font-bold">
          Escolha o tipo de cadastro
        </h2>
        <h2 className="flex flex-col items-center logo-title text-sm font-bold">
          Clique no tipo correspondente para prosseguir
        </h2>

        <div className="w-full flex flex-col gap-4 mt-4">
          <button
            onClick={onSelectAdotante}
            className="w-full py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
          >
            Adotante
          </button>

          <button
            onClick={onSelectOng}
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