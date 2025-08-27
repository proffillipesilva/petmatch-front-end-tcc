// src/MeuForm.jsx
import React, { useState } from "react";
import api from "./api";
import { cnpj } from "cpf-cnpj-validator";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // usando react-icons

const MeuForm = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({
    nomeOng: "",
    emailOng: "",
    telefone: "",
    cnpj: "",
    endereco: "",
    senha: "",
    confirmSenha: "",
    termos: false,
  });

  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefoneError, setTelefoneError] = useState("");
  const [cnpjError, setCnpjError] = useState("");
  const [enderecoError, setEnderecoError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confirmSenhaError, setConfirmSenhaError] = useState("");
  const [termosError, setTermosError] = useState("");
  const [loading, setLoading] = useState(false);

  // estados para mostrar/ocultar senha
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const enviaServidor = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Nome
    if (!form.nomeOng) {
      setNomeError("O nome é obrigatório!");
      hasError = true;
    } else setNomeError("");

    // E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!form.emailOng) {
      setEmailError("O e-mail é obrigatório!");
      hasError = true;
    } else if (!emailRegex.test(form.emailOng)) {
      setEmailError("Digite um e-mail válido que termine com '.com'");
      hasError = true;
    } else setEmailError("");

    // Telefone
    if (!form.telefone) {
      setTelefoneError("O telefone é obrigatório!");
      hasError = true;
    } else setTelefoneError("");

    // CNPJ
    if (!form.cnpj) {
      setCnpjError("O CNPJ é obrigatório!");
      hasError = true;
    } else if (!cnpj.isValid(form.cnpj)) {
      setCnpjError("CNPJ inválido!");
      hasError = true;
    } else setCnpjError("");

    // Endereço
    if (!form.endereco) {
      setEnderecoError("O endereço é obrigatório!");
      hasError = true;
    } else setEnderecoError("");

    // Senha
    if (!form.senha) {
      setSenhaError("A senha é obrigatória!");
      hasError = true;
    } else setSenhaError("");

    // Confirmar Senha
    if (!form.confirmSenha) {
      setConfirmSenhaError("A confirmação da senha é obrigatória!");
      hasError = true;
    } else if (form.senha !== form.confirmSenha) {
      setConfirmSenhaError("As senhas não coincidem!");
      hasError = true;
    } else setConfirmSenhaError("");

    // Termos de uso
    if (!form.termos) {
      setTermosError("Você deve aceitar os termos de uso!");
      hasError = true;
    } else setTermosError("");

    if (hasError) return;

    try {
      setLoading(true);
      await api.post("/users", {
        nomeOng: form.nomeOng,
        emailOng: form.emailOng,
        telefone: form.telefone,
        cnpj: form.cnpj,
        endereco: form.endereco,
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

  const handleForm = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));

    if (name === "nomeOng" && nomeError) setNomeError("");
    if (name === "emailOng" && emailError) setEmailError("");
    if (name === "telefone" && telefoneError) setTelefoneError("");
    if (name === "cnpj" && cnpjError) setCnpjError("");
    if (name === "endereco" && enderecoError) setEnderecoError("");
    if (name === "senha" && senhaError) setSenhaError("");
    if (name === "confirmSenha" && confirmSenhaError) setConfirmSenhaError("");
    if (name === "termos" && termosError) setTermosError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 bg-auth-pattern bg-cover bg-center bg-no-repeat text-[#333]">
      <div className="relative w-full max-w-md sm:max-w-[400px] xl:max-w-[420px] min-w-[280px] p-0 animate-slideIn">
        <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl text-shadow">
          <h2 className="logo-title text-6xl font-bold">PetMatch</h2>
          <img src="/imgs/Frame1.png" alt="logo" className="max-w-[200px] mt-2.5" />
          <h2 className="flex flex-col items-center logo-title text-2xl font-bold">Crie uma conta</h2>
          <h2 className="flex flex-col items-center logo-title text-sm font-bold">
            Digite seus dados para cadastrar no aplicativo
          </h2>
        </div>

        <form onSubmit={enviaServidor} className="w-full">
          {/* Nome */}
          <div className="mb-3.5">
            <label htmlFor="nomeOng" className="block text-black font-medium text-sm text-shadow">
              Nome:
            </label>
            <input
              id="nomeOng"
              name="nomeOng"
              type="text"
              value={form.nomeOng}
              onChange={handleForm}
              placeholder="Digite o nome"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${
                nomeError ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            {nomeError && <p className="text-red-600 text-xs mt-1">{nomeError}</p>}
          </div>

          {/* Email */}
          <div className="mb-3.5">
            <label htmlFor="emailOng" className="block text-black font-medium text-sm text-shadow">
              E-mail:
            </label>
            <input
              id="emailOng"
              name="emailOng"
              type="email"
              value={form.emailOng}
              onChange={handleForm}
              placeholder="Digite o e-mail"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${
                emailError ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            {emailError && <p className="text-red-600 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Telefone */}
          <div className="mb-3.5">
            <label htmlFor="telefone" className="block text-black font-medium text-sm text-shadow">
              Telefone:
            </label>
            <input
              id="telefone"
              name="telefone"
              type="text"
              value={form.telefone}
              onChange={handleForm}
              placeholder="Digite o telefone"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${
                telefoneError ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            {telefoneError && <p className="text-red-600 text-xs mt-1">{telefoneError}</p>}
          </div>

          {/* CNPJ */}
          <div className="mb-3.5">
            <label htmlFor="cnpj" className="block text-black font-medium text-sm text-shadow">
              CNPJ:
            </label>
            <input
              id="cnpj"
              name="cnpj"
              type="text"
              value={form.cnpj}
              onChange={handleForm}
              placeholder="Digite o CNPJ"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${
                cnpjError ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            {cnpjError && <p className="text-red-600 text-xs mt-1">{cnpjError}</p>}
          </div>

          {/* Endereço */}
          <div className="mb-3.5">
            <label htmlFor="endereco" className="block text-black font-medium text-sm text-shadow">
              Endereço:
            </label>
            <input
              id="endereco"
              name="endereco"
              type="text"
              value={form.endereco}
              onChange={handleForm}
              placeholder="Digite o endereço"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${
                enderecoError ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            {enderecoError && <p className="text-red-600 text-xs mt-1">{enderecoError}</p>}
          </div>

          {/* Senha */}
          <div className="mb-3.5 relative">
            <label htmlFor="senha" className="block text-black font-medium text-sm text-shadow">
              Senha:
            </label>
            <input
              id="senha"
              name="senha"
              type={showSenha ? "text" : "password"}
              value={form.senha}
              onChange={handleForm}
              placeholder="Crie uma senha"
              className={`w-full text-sm py-2.5 px-3 pr-10 rounded-md border-[1.5px] ${
                senhaError ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showSenha ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
            {senhaError && <p className="text-red-600 text-xs mt-1">{senhaError}</p>}
          </div>

          {/* Confirmar Senha */}
          <div className="mb-3.5 relative">
            <label htmlFor="confirmSenha" className="block text-black font-medium text-sm text-shadow">
              Confirmar Senha:
            </label>
            <input
              id="confirmSenha"
              name="confirmSenha"
              type={showConfirmSenha ? "text" : "password"}
              value={form.confirmSenha}
              onChange={handleForm}
              placeholder="Repita a senha"
              className={`w-full text-sm py-2.5 px-3 pr-10 rounded-md border-[1.5px] ${
                confirmSenhaError ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmSenha(!showConfirmSenha)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showConfirmSenha ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
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
              Aceito os{" "}
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

          <p className="mt-6 text-lg text-gray-500 text-center text-shadow">
            Já tem uma conta?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSwitchToLogin();
              }}
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
