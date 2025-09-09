// src/LoginScreen.jsx
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../../../shared/utils/api";

import Frame1 from "../../../images/Frame1.png";
import AuthImg from "../../../images/Auth.png"; // Caso queira usar depois

const LoginScreen = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("adotante");

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const userInfo = await res.json();

        onLoginSuccess({
          nomeOng: userInfo.name,
          emailOng: userInfo.email,
          googleId: userInfo.sub,
          picture: userInfo.picture,
        });
      } catch (error) {
        console.error("Erro ao pegar dados do Google:", error);
        alert("Falha no login com Google");
      }
    },
    onError: () => alert("Login com Google falhou"),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!form.email) { setEmailError("O e-mail é obrigatório!"); hasError = true; } 
    else setEmailError("");

    if (!form.password) { setPasswordError("A senha é obrigatória!"); hasError = true; } 
    else setPasswordError("");

    if (hasError) return;

    try {
      setLoading(true);
      const payload =
        loginType === "adotante"
          ? { emailAdotante: form.email, senha: form.password }
          : { emailOng: form.email, senha: form.password };

      const endpoint =
        loginType === "adotante" ? "/adotantes/login" : "/users/login";

      const response = await api.post(endpoint, payload);
      console.log("Login bem-sucedido:", response.data);
      onLoginSuccess(response.data);
    } catch (err) {
      console.error("Erro ao logar:", err);
      alert("E-mail ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 text-[#333]">
      <div className="relative w-full max-w-md sm:max-w-[400px] xl:max-w-[420px] min-w-[280px] p-0 animate-slideIn">
        <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl">
          <h2 className="logo-title text-6xl font-bold">PetMatch</h2>
          <img src={Frame1} alt="logo" className="max-w-[200px] mt-2.5" />
        </div>

        <h2 className="text-2xl font-bold text-center">Entre na conta</h2>
        <p className="text-sm font-bold text-center mb-4">
          Digite seu e-mail e senha para acessar
        </p>

        {/* Seleção de tipo de login */}
        <div className="flex justify-center mb-4 w-full gap-2">
          {["adotante", "ong"].map((type) => (
            <button
              key={type}
              onClick={() => setLoginType(type)}
              className={`flex-1 px-4 py-2 font-semibold text-sm rounded-full transition-colors duration-200 shadow-md ${
                loginType === type ? "bg-black text-white" : "bg-amber-200 text-black"
              }`}
            >
              {type === "adotante" ? "Adotante" : "ONG"}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label htmlFor="email" className="block text-black font-medium text-sm">
              E-mail:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleForm}
              placeholder="exemplo@dominio.com"
              className={`w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] ${
                emailError ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            {emailError && <p className="text-red-600 text-xs mt-1">{emailError}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-black font-medium text-sm">
              Senha:
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleForm}
              placeholder="Digite sua senha"
              className={`w-full text-sm py-2.5 px-3 pr-10 rounded-md border-[1.5px] ${
                passwordError ? "border-red-500" : "border-white/80"
              } bg-white/95 text-black`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
            {passwordError && <p className="text-red-600 text-xs mt-1">{passwordError}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-base rounded-2xl py-2.5 bg-black text-white font-semibold cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-500 text-lg">ou continue com</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button
          onClick={() => loginWithGoogle()}
          className="relative w-full py-2.5 rounded-xl border border-gray-300 flex items-center justify-center bg-amber-200 hover:bg-gray-100 transition-colors shadow-md"
        >
          <FcGoogle className="w-5 h-5 absolute left-4" />
          <span className="text-black font-medium">Google</span>
        </button>

        <p className="mt-6 text-lg text-gray-500 text-center">
          Não tem uma conta?{" "}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}
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
