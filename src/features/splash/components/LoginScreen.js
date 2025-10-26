import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";
import useAuthStore from "../../../shared/store/AuthStore";
import useUserStore from "../../../shared/store/UserStore";
import { jwtDecode } from "jwt-decode";
import Frame1 from "../assets/Frame1.png";

const LoginScreen = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("adotante");

  const navigate = useNavigate();
  const { setAuthData, fcmToken } = useAuthStore();
  const { setMe } = useUserStore();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async () => {
      alert("Login com Google ainda não implementado com o backend.");
    },
    onError: () => alert("Login com Google falhou."),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!form.email) {
      setEmailError("O e-mail é obrigatório!");
      hasError = true;
    } else setEmailError("");

    if (!form.password) {
      setPasswordError("A senha é obrigatória!");
      hasError = true;
    } else setPasswordError("");

    if (hasError) return;

    try {
      setLoading(true);
      const loginResponse = await LoginService.login({
        email: form.email,
        password: form.password,
      });

      const receivedToken = loginResponse.token;
      if (!receivedToken) throw new Error("Token de autenticação não foi recebido.");

      localStorage.setItem("accessToken", receivedToken);
      const decodedUser = jwtDecode(receivedToken);
      setAuthData(receivedToken, decodedUser);

      if (fcmToken) await LoginService.sendToken({ fcmToken });

      const userInfo = await LoginService.me();
      setMe(userInfo.tipo, userInfo);

      navigate("/adotante-home");
    } catch (err) {
      console.error("Erro ao logar:", err.message);
      alert(err.message);
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
          Entre na conta
        </h2>
        <p className="text-sm font-medium text-gray-700 mb-5">
          Digite seu e-mail e senha para acessar
        </p>

        {/* Tipo de Login */}
        <div className="flex justify-center mb-6 w-full gap-2">
          {["adotante", "ong"].map((type) => (
            <button
              key={type}
              onClick={() => setLoginType(type)}
              className={`flex-1 px-4 py-2 font-semibold text-sm rounded-full transition-all duration-200 shadow-sm ${
                loginType === type
                  ? "bg-black text-white"
                  : "bg-amber-100 hover:bg-amber-200 text-black"
              }`}
            >
              {type === "adotante" ? "Adotante" : "ONG"}
            </button>
          ))}
        </div>

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

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-gray-600 text-sm">ou continue com</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button
          onClick={() => loginWithGoogle()}
          className="relative w-full py-2.5 rounded-3xl flex items-center justify-center bg-amber-200 hover:bg-amber-300 transition shadow-md font-medium"
        >
          <FcGoogle className="w-5 h-5 absolute left-4" />
          Google
        </button>

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
