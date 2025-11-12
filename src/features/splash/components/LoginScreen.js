import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import publicApi from "../../../shared/utils/publicApi";
import LoginService from "../services/LoginService";
import useAuthStore from "../../../shared/store/AuthStore";
// import useUserStore from "../../../shared/store/UserStore"; // Removido (login() cuida disso)
import Frame1 from "../assets/Frame1.png";

// Importe o useAuth do seu AuthContext
import { useAuth } from "../../../shared/context/AuthContext";

const LoginScreen = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuthData, fcmToken } = useAuthStore();
  // const { setMe } = useUserStore(); // Removido

  // Pegue a função 'login' do seu AuthContext
  const { login } = useAuth();
  // 🔹 Atualiza campos do formulário
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };

  // 🔹 Login com e-mail e senha
  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(""); // Limpa erros antigos
    setPasswordError(""); // Limpa erros antigos

    if (!form.email) {
      setEmailError("O e-mail é obrigatório!");
      return;
    }
    if (!form.password) {
      setPasswordError("A senha é obrigatória!");
      return;
    }

    try {
      setLoading(true);

      // 1. Chama o endpoint de login
      const response = await publicApi.post("/v1/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      const token = response.data.token;
      if (!token) throw new Error("Token JWT não recebido do servidor.");

      // ✨ 2. Decodifica o token para pegar o ID (sub)
      const decodedUser = jwtDecode(token);
      const userIdFromToken = decodedUser.id;
      if (!userIdFromToken) {
          throw new Error("ID do usuário (claim 'id') não encontrado no token JWT.");
      }

      // ✨ 3. Salva o token no AuthStore IMEDIATAMENTE
      // (Para que a chamada /me e /notifications/token funcionem)
      setAuthData(token, decodedUser);

      // 4. Envia FCM Token (notificações)
      if (fcmToken) {
        await LoginService.sendToken({ fcmToken });
      }

      // 5. Busca dados completos do usuário (que vêm sem o 'id')
      console.log("Buscando informações completas do usuário (/me)...");
      const userInfo = await LoginService.me(); // {email, tipo, ...}

      // ✨ 6. CORREÇÃO: Juntar o ID do token com os dados do /me
      const completeUser = {
          ...userInfo,        // (email, tipo, cnpj, etc.)
          id: userIdFromToken // <-- Adicionamos o ID que faltava
      };

      console.log("Usuário completo (com ID mergeado):", completeUser);

      // ✨ 7. Chamar o login do Contexto com o usuário COMPLETO
      // (Isso vai salvar em todo canto e redirecionar)
      login(completeUser, token);

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Exibe o erro no formulário em vez de um 'alert'
      setPasswordError(error.response?.data?.message || "E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 text-[#333]"
      style={{
        background: "linear-gradient(to bottom, #FFE680, #FFF5CC)",
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2017/01/31/20/26/paw-print-2027703_1280.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-8 sm:p-10 w-full max-w-[700px] text-center">
        {/* Logo e título */}
        <h1 className="text-5xl font-extrabold text-black mb-3">PetMatch</h1>
        <img
          src={Frame1}
          alt="logo"
          className="mx-auto mb-4 w-28 sm:w-32 drop-shadow-md"
        />

        <h2 className="text-lg font-semibold text-black mb-1">
          Entre na sua conta
        </h2>
        <p className="text-sm font-medium text-gray-700 mb-5">
          Digite seu e-mail e senha para continuar
        </p>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="w-full text-left">
          <label
            htmlFor="email"
            className="block text-black font-medium text-sm mb-1"
          >
            E-mail:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleForm}
            placeholder="exemplo@dominio.com"
            className={`w-full text-sm py-2.5 px-3 rounded-md border ${
              emailError ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {emailError && (
            <p className="text-red-600 text-xs mt-1">{emailError}</p>
          )}

          <label
            htmlFor="password"
            className="block text-black font-medium text-sm mt-4 mb-1"
          >
            Senha:
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleForm}
              placeholder="Digite sua senha"
              className={`w-full text-sm py-2.5 px-3 pr-10 rounded-md border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-amber-400`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-600 text-xs mt-1">{passwordError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-2.5 rounded-3xl bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        {/* Link de cadastro */}
        <p className="mt-6 text-sm text-gray-600">
          Não tem uma conta?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/tipo-cadastro");
            }}
            className="underline text-black hover:text-gray-700"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;