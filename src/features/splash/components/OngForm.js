import React, { useState } from "react";
import { cnpj } from "cpf-cnpj-validator";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import OngService from "../services/OngService";
import LoginService from "../services/LoginService"; // [ALTERAÇÃO] Importado
import useAuthStore from "../../../shared/store/AuthStore"; // [ALTERAÇÃO] Importado
import useUserStore from "../../../shared/store/UserStore"; // [ALTERAÇÃO] Importado

import Frame1 from "../assets/Frame1.png";
// import AuthImg from "../assets/Auth.png"; // Removido, não estava em uso

const OngForm = () => {
  const navigate = useNavigate();
  // [ALTERAÇÃO] Stores de autenticação e usuário
  const { setAuthData, fcmToken } = useAuthStore();
  const { setMe } = useUserStore();

const [form, setForm] = useState({
  nomeOng: "",
  nomeFantasiaOng: "",
  razaoSocialOng: "",
  emailOng: "",
  telefone: "",
  celular: "", // <-- adicione isso
  cnpj: "",
  endereco: "",
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

    // --- Lógica de Validação de Erros (Atualizada) ---
    if (!form.nomeOng) tempErrors.nomeOng = "O nome é obrigatório!";
    if (!form.nomeFantasiaOng)
      tempErrors.nomeFantasiaOng = "O nome fantasia é obrigatório!";
    if (!form.razaoSocialOng)
      tempErrors.razaoSocialOng = "A razão social é obrigatória!";

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!form.emailOng) tempErrors.emailOng = "O e-mail é obrigatório!";
    else if (!emailRegex.test(form.emailOng))
      tempErrors.emailOng = "Digite um e-mail válido que termine com '.com'";

    if (!form.telefone) tempErrors.telefone = "O telefone é obrigatório!";
    if (!form.cnpj) tempErrors.cnpj = "O CNPJ é obrigatório!";
    else if (!cnpj.isValid(form.cnpj)) tempErrors.cnpj = "CNPJ inválido!";
    if (!form.endereco) tempErrors.endereco = "O endereço é obrigatório!";
    if (!form.celular)
      tempErrors.celular = "O celular da ONG é obrigatório!";

    // [ALTERAÇÃO] Validação de senha robusta
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!form.senha) tempErrors.senha = "A senha é obrigatória!";
    else if (!senhaRegex.test(form.senha))
      tempErrors.senha =
        "A senha deve ter no mínimo 8 caracteres e conter letras e pelo menos um caractere especial (@, #, !, etc).";

    if (!form.confirmSenha)
      tempErrors.confirmSenha = "A confirmação da senha é obrigatória!";
    else if (form.senha !== form.confirmSenha)
      tempErrors.confirmSenha = "As senhas não coincidem!";
    if (!form.termos) tempErrors.termos = "Você deve aceitar os termos de uso!";
    // ------------------------------------------------

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      setLoading(true);

      // Prepara o payload para o serviço.
      const payload = {
          name: form.nomeOng,         // mapeia o campo do form para 'name'
          email: form.emailOng,       // deve ser 'email'
          password: form.senha,       // deve ser 'password'
          endereco: form.endereco,    // igual ao DTO
          telefone: form.telefone,    // igual ao DTO
          celular: form.celular,      // igual ao DTO
          cnpj: form.cnpj             // igual ao DTO


        //nomeOng: form.nomeOng,
        //nomeFantasiaOng: form.nomeFantasiaOng,
        //razaoSocialOng: form.razaoSocialOng,
        //emailOng: form.emailOng,
        //telefone: form.telefone,
        //cnpj: form.cnpj,
        //endereco: form.endereco,
        //contatoOng: form.contatoOng,
        //password: form.senha,
      };

      // [ALTERAÇÃO] Fluxo de login idêntico ao AdotanteForm
      console.log("Enviando requisição de registro de ONG...");
      const registerResponse = await OngService.registerOng(payload);
      const receivedToken = registerResponse.token;

      if (!receivedToken)
        throw new Error("Token não recebido após o registro.");

      localStorage.setItem("accessToken", receivedToken);
      const decodedUser = jwtDecode(receivedToken);

      // 1. Apenas atualiza o store de autenticação
      setAuthData(receivedToken, decodedUser);

      if (fcmToken) await LoginService.sendToken({ fcmToken });

      console.log("Buscando informações completas do usuário (/me)...");
      const userInfo = await LoginService.me();

      // 2. Apenas atualiza o store do usuário
      setMe(userInfo.tipo, userInfo);

      // [ALTERAÇÃO] Navegação removida. O PublicRoute cuidará disso.
      // alert("Cadastro realizado com sucesso! Faça login para continuar.");
      // navigate('/login');
    } catch (err) {
      // [ALTERAÇÃO] Tratamento de erro idêntico ao AdotanteForm
      console.error("Erro ao cadastrar:", err);

      const backendMessage = err.response?.data?.message?.toLowerCase() || "";
      const statusCode = err.response?.status;
      console.log("Status recebido:", statusCode);
      console.log("Mensagem do backend:", backendMessage);
      if (backendMessage.includes("não passaram na validação")) {
        setErrors((prev) => ({
          ...prev,
          senha:
            "Os dados enviados não passaram na validação. Verifique se a senha possui pelo menos 8 caracteres e um símbolo especial.",
        }));
      }
      // Adaptado para CNPJ
      else if (backendMessage.includes("cnpj já cadastrado")) {
        setErrors((prev) => ({
          ...prev,
          cnpj: "Este CNPJ já está cadastrado. Tente outro.",
        }));
      } else if (
        backendMessage.includes("email já cadastrado") ||
        backendMessage.includes("e-mail já cadastrado")
      ) {
        setErrors((prev) => ({
          ...prev,
          emailOng: "Este e-mail já está cadastrado. Tente outro.",
        }));
      } else if (statusCode === 409) {
        setErrors((prev) => ({
          ...prev,
          geral: "E-mail ou CNPJ já cadastrado. Tente novamente com outros dados.", // Adaptado
        }));
      } else if (backendMessage) {
        setErrors((prev) => ({
          ...prev,
          geral: err.response.data.message,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          geral: "E-mail ou CNPJ já cadastrado. Tente novamente.", // Adaptado
        }));
      }
    } finally {
      setLoading(false);
    }
  };

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
      {/* Botão Voltar */}
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
          <h2 className="text-2xl font-bold">Crie uma conta da sua ONG!</h2>
          <h2 className="text-sm font-bold">
            Digite seus dados para cadastrar no aplicativo
          </h2>
        </div>

        <form onSubmit={enviaServidor} className="w-full">
          {renderInput("nomeOng", "Nome")}
          {renderInput("nomeFantasiaOng", "Nome Fantasia")}
          {renderInput("razaoSocialOng", "Razão Social")}
          {renderInput("celular", "Celular da ONG")}
          {renderInput("emailOng", "E-mail", "email")}
          {renderInput("telefone", "Telefone")}
          {renderInput("cnpj", "CNPJ")}
          {renderInput("endereco", "Endereço")}

          {/* Senha */}
          <div className="mb-3.5 relative">
            <label
              htmlFor="senha"
              className="block text-black font-medium text-sm"
            >
              Senha:
            </label>
            <input
              id="senha"
              name="senha"
              type={showSenha ? "text" : "password"}
              value={form.senha}
              onChange={handleForm}
              placeholder="Crie uma senha"
              className={`w-full text-base py-3.5 px-3 pr-10 rounded-md border-[1.5px] ${
                errors.senha ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showSenha ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
            {errors.senha && (
              <p className="text-red-600 text-xs mt-1">{errors.senha}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div className="mb-3.5 relative">
            <label
              htmlFor="confirmSenha"
              className="block text-black font-medium text-sm"
            >
              Confirmar Senha:
            </label>
            <input
              id="confirmSenha"
              name="confirmSenha"
              type={showConfirmSenha ? "text" : "password"}
              value={form.confirmSenha}
              onChange={handleForm}
              placeholder="Repita a senha"
              className={`w-full text-base py-3.5 px-3 pr-10 rounded-md border-[1.5px] ${
                errors.confirmSenha ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmSenha(!showConfirmSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmSenha ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
            {errors.confirmSenha && (
              <p className="text-red-600 text-xs mt-1">{errors.confirmSenha}</p>
            )}
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
          {errors.termos && (
            <p className="text-red-600 text-xs mt-1">{errors.termos}</p>
          )}

          {/* [ALTERAÇÃO] Erro geral adicionado */}
          {errors.geral && (
            <p className="text-red-600 text-sm text-center mt-2">
              {errors.geral}
            </p>
          )}

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
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
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

export default OngForm;