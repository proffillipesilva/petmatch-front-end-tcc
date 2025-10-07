import React, { useState } from "react";
import api from "../../../shared/utils/api";
import { cpf } from "cpf-cnpj-validator";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa"; // Importa FaArrowLeft
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

import Frame1 from "../assets/Frame1.png";
// Removido: import AuthImg from "../assets/Auth.png"; (não é usado neste componente)

// Remove a prop onBackToLogin, pois agora usaremos useNavigate
const AdotanteForm = () => {
  const navigate = useNavigate(); // Hook para navegação

  const [form, setForm] = useState({
    nomeAdotante: "",
    cpfAdotante: "",
    enderecoAdotante: "",
    celularAdotante: "",
    emailAdotante: "",
    descricaoOutrosAnimais: "",
    preferencia: "",
    senha: "",
    confirmSenha: "",
    termos: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const handleForm = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  const enviaServidor = async (e) => {
    e.preventDefault();
    const tempErrors = {};

    if (!form.nomeAdotante) tempErrors.nomeAdotante = "O nome é obrigatório!";
    if (!form.cpfAdotante) tempErrors.cpfAdotante = "O CPF é obrigatório!";
    else if (!cpf.isValid(form.cpfAdotante)) tempErrors.cpfAdotante = "CPF inválido!";
    if (!form.emailAdotante) tempErrors.emailAdotante = "O e-mail é obrigatório!";
    else if (!/^[^\s@]+@[^\s@]+\.com$/.test(form.emailAdotante)) tempErrors.emailAdotante = "Digite um e-mail válido que termine com '.com'";
    if (!form.celularAdotante) tempErrors.celularAdotante = "O celular é obrigatório!";
    if (!form.enderecoAdotante) tempErrors.enderecoAdotante = "O endereço é obrigatório!";
    if (!form.descricaoOutrosAnimais) tempErrors.descricaoOutrosAnimais = "A descrição é obrigatória!";
    if (!form.preferencia) tempErrors.preferencia = "A preferência é obrigatória!";
    if (!form.senha) tempErrors.senha = "A senha é obrigatória!";
    if (!form.confirmSenha) tempErrors.confirmSenha = "A confirmação da senha é obrigatória!";
    else if (form.senha !== form.confirmSenha) tempErrors.confirmSenha = "As senhas não coincidem!";
    if (!form.termos) tempErrors.termos = "Você deve aceitar os termos de uso!";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      setLoading(true);
      await api.post("/v1/api/usuarios/adotante", {
        nomeAdotante: form.nomeAdotante,
        cpfAdotante: form.cpfAdotante,
        enderecoAdotante: form.enderecoAdotante,
        celularAdotante: form.celularAdotante,
        emailAdotante: form.emailAdotante,
        descricaoOutrosAnimais: form.descricaoOutrosAnimais,
        preferencia: form.preferencia,
        senha: form.senha,
      });
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      navigate('/login'); // Redireciona para a tela de login
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      if (err.response) {
        if (err.response.status === 409) alert("CPF ou email já cadastrado!");
        else alert(`Erro: ${err.response.data.message || "Tente novamente."}`);
      } else {
        alert("Erro ao cadastrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (id, label, type = "text") => (
    <div className="mb-3.5">
      <label htmlFor={id} className="block text-black font-medium text-sm">{label}:</label>
      <input
        id={id}
        name={id}
        type={type}
        value={form[id]}
        onChange={handleForm}
        placeholder={`Digite ${label.toLowerCase()}`}
        // Ajustado py- para 'py-3.5' para maior altura e text-base para texto maior
        className={`w-full text-base py-3.5 px-3 rounded-md border-[1.5px] ${errors[id] ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
      />
      {errors[id] && <p className="text-red-600 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 text-[#333]"> {/* Adicionado div externa para centralização */}
      {/* Alterado max-w para permitir que o formulário seja mais largo */}
      {/* sm:max-w-[500px] e xl:max-w-[600px] aumentam a largura em diferentes tamanhos de tela */}
      <div className="relative w-full max-w-lg sm:max-w-[500px] xl:max-w-[600px] min-w-[320px] p-0 animate-slideIn"> {/* Aumentado max-w */}
        <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl">

          {/* Botão Voltar */}
          <button
            onClick={handleBack}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaArrowLeft size={20} />
            <span className="text-lg font-medium">Voltar</span>
          </button>

          <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl text-shadow">
            <h2 className="logo-title text-6xl font-bold">PetMatch</h2>
            <img src={Frame1} alt="logo" className="max-w-[200px] mt-2.5" />
            <h2 className="text-2xl font-bold">Crie uma conta de adotante!</h2>
            <h2 className="text-sm font-bold">Digite seus dados para cadastrar no aplicativo</h2>
          </div>
        </div>

        <form onSubmit={enviaServidor} className="w-full">
          {renderInput("nomeAdotante", "Nome")}
          {renderInput("cpfAdotante", "CPF")}
          {renderInput("enderecoAdotante", "Endereço")}
          {renderInput("celularAdotante", "Celular")}
          {renderInput("emailAdotante", "E-mail", "email")}
          {renderInput("descricaoOutrosAnimais", "Descrição sobre outros animais")}
          {renderInput("preferencia", "Preferência")}

          {/* Senha */}
          <div className="mb-3.5 relative">
            <label htmlFor="senha" className="block text-black font-medium text-sm">Senha:</label>
            <input
              id="senha"
              name="senha"
              type={showSenha ? "text" : "password"}
              value={form.senha}
              onChange={handleForm}
              placeholder="Crie uma senha"
              // Ajustado py- para 'py-3.5' e text-base
              className={`w-full text-base py-3.5 px-3 pr-10 rounded-md border-[1.5px] ${errors.senha ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {/* Ícone de olho ajustado para centralização vertical */}
            <button type="button" onClick={() => setShowSenha(!showSenha)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {showSenha ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
            {errors.senha && <p className="text-red-600 text-xs mt-1">{errors.senha}</p>}
          </div>

          {/* Confirmar Senha */}
          <div className="mb-3.5 relative">
            <label htmlFor="confirmSenha" className="block text-black font-medium text-sm">Confirmar Senha:</label>
            <input
              id="confirmSenha"
              name="confirmSenha"
              type={showConfirmSenha ? "text" : "password"}
              value={form.confirmSenha}
              onChange={handleForm}
              placeholder="Repita a senha"
              // Ajustado py- para 'py-3.5' e text-base
              className={`w-full text-base py-3.5 px-3 pr-10 rounded-md border-[1.5px] ${errors.confirmSenha ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {/* Ícone de olho ajustado para centralização vertical */}
            <button type="button" onClick={() => setShowConfirmSenha(!showConfirmSenha)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {showConfirmSenha ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
            {errors.confirmSenha && <p className="text-red-600 text-xs mt-1">{errors.confirmSenha}</p>}
          </div>

          {/* Termos */}
          <div className="mb-2 flex items-center gap-2">
            <input
              id="termos"
              name="termos"
              type="checkbox"
              checked={form.termos}
              onChange={handleForm}
              className="w-6 h-6 border-gray-400 rounded"
            />
            <label htmlFor="termos" className="text-base text-black">
              Li e aceito os{" "}
              <a href="https://youtu.be/LHqRwGTP2qQ?si=aEOQvKV9cTonfz0k" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
                termos de uso
              </a>
            </label>
          </div>
          {errors.termos && <p className="text-red-600 text-xs mt-1">{errors.termos}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-base rounded-2xl py-2.5 mt-4 bg-black text-white font-semibold cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <p className="mt-6 text-lg text-gray-500 text-center">
            Já tem uma conta?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="underline text-black hover:text-gray-700">
              Faça login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdotanteForm;
