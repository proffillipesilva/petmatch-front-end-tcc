import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginScreen = ({ onSwitchToRegister }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticação aqui, por exemplo:
    console.log("Tentativa de login com:", form);
    alert('Tentativa de login!');
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 bg-auth-pattern bg-cover bg-center bg-no-repeat text-[#333]">
      <div className="relative w-full max-w-md sm:max-w-[400px] xl:max-w-[420px] min-w-[280px] p-0 animate-slideIn">

        {/* Bloco da logo com a imagem Frame1.png */}
        <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl text-shadow">
        <h2 className="logo-title text-6xl font-bold">PetMatch</h2>
          <img
            src="/imgs/Frame1.png"
            alt="logo"
            className="max-w-[200px] mt-2.5"
          />
        </div>
        <h2 className="flex flex-col items-center logo-title text-2xl font-bold">Entre na conta</h2>
        <h2 className="flex flex-col items-center logo-title text-sm font-bold">Digite o seu e-mail para cadastrar no aplicativo</h2>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label htmlFor="email" className="block text-black font-medium text-sm text-left text-shadow">E-mail:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleForm}
              placeholder="exemplo@dominio.com.br"
              className="w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] border-white/80 bg-white/95 text-black transition-colors duration-200 shadow-white-glow placeholder:text-gray-600 focus:outline-none focus:border-[#ffd966] focus:bg-white/70 focus:shadow-yellow-glow-focus"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-black font-medium text-sm text-left text-shadow">Senha:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleForm}
              placeholder="Digite sua senha"
              className="w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] border-white/80 bg-white/95 text-black transition-colors duration-200 shadow-white-glow placeholder:text-gray-600 focus:outline-none focus:border-[#ffd966] focus:bg-white/70 focus:shadow-yellow-glow-focus"
            />
          </div>

          <button
            type="submit"
            className="w-full text-base rounded-2xl py-2.5 bg-black text-white font-semibold rounded-md cursor-pointer transition-colors hover:bg-gray-800"
          >
            Entrar
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-500 text-lg text-shadow"> ou continue com </span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button
         className="relative w-full py-2.5 rounded-xl border border-gray-300 flex items-center bg-amber-200 hover:bg-gray-100 transition-colors shadow-md"
        >
            {/* Ícone fixo na esquerda */}
            <span className="ml-4">
            <FcGoogle className="w-5 h-5" />
        </span>

  {/* Texto centralizado com position absolute */}
  <span className="absolute left-1/2 transform -translate-x-1/2 text-black font-medium">
    Google
  </span>
       </button>

   <p className="mt-6 text-lg text-gray-500 text-center text-shadow">
  Não tem uma conta?{' '}
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onSwitchToRegister();
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