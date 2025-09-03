// src/MeuForm.jsx
import React, { useState } from "react";
import api from "../../../shared/utils/api";
import { cnpj } from "cpf-cnpj-validator";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Frame1 from "../../../images/Frame1.png";
import AuthImg from "../../../images/Auth.png";

const MeuForm = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({
    nomeOng: "",
    nomeFantasiaOng: "",  // novo
    razaoSocialOng: "",   // novo
    emailOng: "",
    telefone: "",
    cnpj: "",
    endereco: "",
    contatoOng: "",        // novo
    senha: "",
    confirmSenha: "",
    termos: false,
  });

  const [nomeError, setNomeError] = useState("");
  const [nomeFantasiaError, setNomeFantasiaError] = useState("");
  const [razaoSocialError, setRazaoSocialError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefoneError, setTelefoneError] = useState("");
  const [cnpjError, setCnpjError] = useState("");
  const [enderecoError, setEnderecoError] = useState("");
  const [contatoOngError, setContatoOngError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confirmSenhaError, setConfirmSenhaError] = useState("");
  const [termosError, setTermosError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const handleForm = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));

    if (name === "nomeOng") setNomeError("");
    if (name === "nomeFantasiaOng") setNomeFantasiaError("");
    if (name === "razaoSocialOng") setRazaoSocialError("");
    if (name === "emailOng") setEmailError("");
    if (name === "telefone") setTelefoneError("");
    if (name === "cnpj") setCnpjError("");
    if (name === "endereco") setEnderecoError("");
    if (name === "contatoOng") setContatoOngError("");
    if (name === "senha") setSenhaError("");
    if (name === "confirmSenha") setConfirmSenhaError("");
    if (name === "termos") setTermosError("");
  };

  const enviaServidor = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!form.nomeOng) { setNomeError("O nome é obrigatório!"); hasError = true; }
    if (!form.nomeFantasiaOng) { setNomeFantasiaError("O nome fantasia é obrigatório!"); hasError = true; }
    if (!form.razaoSocialOng) { setRazaoSocialError("A razão social é obrigatória!"); hasError = true; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!form.emailOng) { setEmailError("O e-mail é obrigatório!"); hasError = true; }
    else if (!emailRegex.test(form.emailOng)) { setEmailError("Digite um e-mail válido que termine com '.com'"); hasError = true; }

    if (!form.telefone) { setTelefoneError("O telefone é obrigatório!"); hasError = true; }
    if (!form.cnpj) { setCnpjError("O CNPJ é obrigatório!"); hasError = true; }
    else if (!cnpj.isValid(form.cnpj)) { setCnpjError("CNPJ inválido!"); hasError = true; }

    if (!form.endereco) { setEnderecoError("O endereço é obrigatório!"); hasError = true; }
    if (!form.contatoOng) { setContatoOngError("O contato da ONG é obrigatório!"); hasError = true; }

    if (!form.senha) { setSenhaError("A senha é obrigatória!"); hasError = true; }
    if (!form.confirmSenha) { setConfirmSenhaError("A confirmação da senha é obrigatória!"); hasError = true; }
    else if (form.senha !== form.confirmSenha) { setConfirmSenhaError("As senhas não coincidem!"); hasError = true; }

    if (!form.termos) { setTermosError("Você deve aceitar os termos de uso!"); hasError = true; }

    if (hasError) return;

    try {
      setLoading(true);
      await api.post("/users", {
        nomeOng: form.nomeOng,
        nomeFantasiaOng: form.nomeFantasiaOng,
        razaoSocialOng: form.razaoSocialOng,
        emailOng: form.emailOng,
        telefone: form.telefone,
        cnpj: form.cnpj,
        endereco: form.endereco,
        contatoOng: form.contatoOng,
        senha: form.senha,
      });
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      onSwitchToLogin();
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 bg-auth-pattern bg-cover bg-center bg-no-repeat text-[#333]">
      <div className="relative w-full max-w-md sm:max-w-[400px] xl:max-w-[420px] min-w-[280px] p-0 animate-slideIn">
        <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl text-shadow">
          <h2 className="logo-title text-6xl font-bold">PetMatch</h2>
          <img src={Frame1} alt="logo" className="max-w-[200px] mt-2.5" />
          <h2 className="flex flex-col items-center logo-title text-2xl font-bold">Crie uma conta da sua ONG!</h2>
          <h2 className="flex flex-col items-center logo-title text-sm font-bold">
            Digite seus dados para cadastrar no aplicativo
          </h2>
        </div>

        <form onSubmit={enviaServidor} className="w-full">
          {/* Nome */}
          <div className="mb-3.5">
            <label htmlFor="nomeOng" className="block text-black font-medium text-sm">Nome:</label>
            <input
              id="nomeOng"
              name="nomeOng"
              type="text"
              value={form.nomeOng}
              onChange={handleForm}
              placeholder="Digite o nome"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${nomeError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {nomeError && <p className="text-red-600 text-xs mt-1">{nomeError}</p>}
          </div>

          {/* Nome Fantasia */}
          <div className="mb-3.5">
            <label htmlFor="nomeFantasiaOng" className="block text-black font-medium text-sm">Nome Fantasia:</label>
            <input
              id="nomeFantasiaOng"
              name="nomeFantasiaOng"
              type="text"
              value={form.nomeFantasiaOng}
              onChange={handleForm}
              placeholder="Digite o nome fantasia"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${nomeFantasiaError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {nomeFantasiaError && <p className="text-red-600 text-xs mt-1">{nomeFantasiaError}</p>}
          </div>

          {/* Razão Social */}
          <div className="mb-3.5">
            <label htmlFor="razaoSocialOng" className="block text-black font-medium text-sm">Razão Social:</label>
            <input
              id="razaoSocialOng"
              name="razaoSocialOng"
              type="text"
              value={form.razaoSocialOng}
              onChange={handleForm}
              placeholder="Digite a razão social"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${razaoSocialError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {razaoSocialError && <p className="text-red-600 text-xs mt-1">{razaoSocialError}</p>}
          </div>

          {/* Contato ONG */}
          <div className="mb-3.5">
            <label htmlFor="contatoOng" className="block text-black font-medium text-sm">Contato da ONG:</label>
            <input
              id="contatoOng"
              name="contatoOng"
              type="text"
              value={form.contatoOng}
              onChange={handleForm}
              placeholder="Nome do funcionário responsável"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${contatoOngError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {contatoOngError && <p className="text-red-600 text-xs mt-1">{contatoOngError}</p>}
          </div>

          {/* E-mail */}
          <div className="mb-3.5">
            <label htmlFor="emailOng" className="block text-black font-medium text-sm">E-mail:</label>
            <input
              id="emailOng"
              name="emailOng"
              type="email"
              value={form.emailOng}
              onChange={handleForm}
              placeholder="Digite o e-mail"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${emailError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {emailError && <p className="text-red-600 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Telefone */}
          <div className="mb-3.5">
            <label htmlFor="telefone" className="block text-black font-medium text-sm">Telefone:</label>
            <input
              id="telefone"
              name="telefone"
              type="text"
              value={form.telefone}
              onChange={handleForm}
              placeholder="Digite o telefone"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${telefoneError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {telefoneError && <p className="text-red-600 text-xs mt-1">{telefoneError}</p>}
          </div>

          {/* CNPJ */}
          <div className="mb-3.5">
            <label htmlFor="cnpj" className="block text-black font-medium text-sm">CNPJ:</label>
            <input
              id="cnpj"
              name="cnpj"
              type="text"
              value={form.cnpj}
              onChange={handleForm}
              placeholder="Digite o CNPJ"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${cnpjError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {cnpjError && <p className="text-red-600 text-xs mt-1">{cnpjError}</p>}
          </div>

          {/* Endereço */}
          <div className="mb-3.5">
            <label htmlFor="endereco" className="block text-black font-medium text-sm">Endereço:</label>
            <input
              id="endereco"
              name="endereco"
              type="text"
              value={form.endereco}
              onChange={handleForm}
              placeholder="Digite o endereço"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${enderecoError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            {enderecoError && <p className="text-red-600 text-xs mt-1">{enderecoError}</p>}
          </div>

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
              className={`w-full text-sm py-2.5 px-3 pr-10 rounded-md border-[1.5px] ${senhaError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showSenha ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
            {senhaError && <p className="text-red-600 text-xs mt-1">{senhaError}</p>}
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
              className={`w-full text-sm py-2.5 px-3 pr-10 rounded-md border-[1.5px] ${confirmSenhaError ? "border-red-500" : "border-white/80"} bg-white/95 text-black`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmSenha(!showConfirmSenha)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showConfirmSenha ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
            {confirmSenhaError && <p className="text-red-600 text-xs mt-1">{confirmSenhaError}</p>}
          </div>

          {/* Termos de uso */}
          <div className="mb-3.5 flex items-center gap-2">
            <input
              id="termos"
              name="termos"
              type="checkbox"
              checked={form.termos}
              onChange={handleForm}
              className="w-4 h-4 border-gray-400 rounded"
            />
            <label htmlFor="termos" className="text-sm text-black">
              Li e aceito os{" "}
              <a
                href="https://youtu.be/LHqRwGTP2qQ?si=aEOQvKV9cTonfz0k"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
              >
                termos de uso
              </a>
            </label>
          </div>
          {termosError && <p className="text-red-600 text-xs mt-1">{termosError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-base rounded-2xl py-2.5 mt-4 bg-black text-white font-semibold cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <p className="mt-6 text-lg text-gray-500 text-center">
            Já tem uma conta?{" "}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}
              className="underline text-black hover:text-gray-700"
            >
              Faça login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default MeuForm;