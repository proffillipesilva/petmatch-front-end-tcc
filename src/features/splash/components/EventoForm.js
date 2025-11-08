import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EventoService from "../services/EventoService";
import Frame1 from "../assets/Frame1.png";

const EventoForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    dataHora: "",
    endereco: "",
  });

  // Apenas para erros de VALIDAÇÃO (front-end), não de API
  const [errors, setErrors] = useState({});

  // NÃO PRECISAMOS de 'loading' state, o 'api.js' cuida disso!

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBack = () => navigate(-1);

  const enviaServidor = async (e) => {
    e.preventDefault();
    const tempErrors = {};

    // Validações básicas (front-end)
    if (!form.nome) tempErrors.nome = "O nome do evento é obrigatório!";
    if (!form.dataHora) tempErrors.dataHora = "A data e hora são obrigatórias!";
    if (!form.endereco) tempErrors.endereco = "O endereço é obrigatório!";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      // O 'api.js' vai mostrar "Carregando..." automaticamente
      const payload = {
        nome: form.nome,
        dataHora: form.dataHora,
        endereco: form.endereco,
      };

      await EventoService.criarEvento(payload);
      
      // Sucesso! O 'api.js' vai mostrar o modal de sucesso.
      // Apenas navegamos de volta para a lista.
      navigate("/eventos");

    } catch (err) {
      // Erro! O 'api.js' vai mostrar o modal de erro.
      // Nós não precisamos fazer nada aqui, apenas logar.
      console.error("Falha ao cadastrar evento:", err);
    }
  };

  // Função helper para renderizar inputs
  const renderInput = (id, label, type = "text") => (
    <div className="mb-3.5">
      <label htmlFor={id} className="block text-black font-medium text-sm">
        {label}:
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={form[id]}
        onChange={handleForm}
        placeholder={`Digite ${label.toLowerCase()}`}
        className={`w-full text-base py-3.5 px-3 rounded-md border-[1.5px] ${
          errors[id] ? "border-red-500" : "border-white/80"
        } bg-white/95 text-black`}
      />
      {errors[id] && <p className="text-red-600 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 text-[#333]">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-black rounded-lg hover:bg-gray-200 transition-colors z-50"
      >
        <FaArrowLeft size={20} />
        <span className="text-lg font-medium">Voltar</span>
      </button>
      <div className="relative w-full max-w-[500px] min-w-[320px] p-0 animate-slideIn">
        <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl text-shadow">
          <h2 className="logo-title text-6xl font-bold">PetMatch</h2>
          <img src={Frame1} alt="logo" className="max-w-[200px] mt-2.5" />
          <h2 className="text-2xl font-bold">Cadastrar Novo Evento</h2>
          <h2 className="text-sm font-bold">
            Preencha os dados para criar um novo evento
          </h2>
        </div>

        <form onSubmit={enviaServidor} className="w-full">
          {renderInput("nome", "Nome do Evento")}
          {renderInput("dataHora", "Data e Hora", "datetime-local")}
          {renderInput("endereco", "Endereço")}

          {/* O 'errors.geral' foi removido pois o modal de 'api.js' o substitui */}

          <button
            type="submit"
            // O 'disabled' foi removido pois o modal de 'api.js' bloqueia a tela
            className="w-full text-base rounded-2xl py-2.5 mt-4 bg-black text-white font-semibold cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            Cadastrar Evento
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventoForm;