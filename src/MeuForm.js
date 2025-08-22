import React from 'react'
import api from './api'
import { cnpj } from 'cpf-cnpj-validator';

const MeuForm = ({ onSwitchToLogin }) => {

    const [form, setForm] = React.useState({nomeOng: "", emailOng: "", telefone: "", cnpj: "", endereco:""})

    const enviaServidor = async (e) => {
        e.preventDefault()

        if (!cnpj.isValid(form.cnpj)) {
            alert("CNPJ inválido!");
            return;
        }

        try{
            const resposta = await api.post("/users", form)
            console.log(resposta)
        } catch(err){
            console.log(err)
        }
    }

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 bg-auth-pattern bg-cover bg-center bg-no-repeat text-[#333]">
        <div className="relative w-full max-w-md sm:max-w-[400px] xl:max-w-[420px] min-w-[280px] p-0 animate-slideIn">

            {/* Bloco da logo com a imagem Frame1.png */}
            <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl text-shadow">
                <h2 className="logo-title">PetMatch</h2>
                <img 
                    src="/imgs/Frame1.png" 
                    alt="logo" 
                    className="max-w-[120px] mt-2.5" 
                />
            </div>

            <form onSubmit={enviaServidor} className="w-full">
                <div className="mb-3.5">
                    <label htmlFor="nomeOng" className="block text-black font-medium text-sm text-shadow">Nome:</label>
                    <input 
                        id="nomeOng" 
                        name="nomeOng" 
                        type="text" 
                        value={form.nomeOng} 
                        onChange={handleForm} 
                        placeholder="Digite o nome"
                        className="w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] border-white/80 bg-white/95 text-black transition-colors duration-200 shadow-white-glow placeholder:text-gray-600 focus:outline-none focus:border-[#ffd966] focus:bg-white/70 focus:shadow-yellow-glow-focus"
                    />
                </div>
                <div className="mb-3.5">
                    <label htmlFor="emailOng" className="block text-black font-medium text-sm text-shadow">E-mail:</label>
                    <input 
                        id="emailOng" 
                        name="emailOng" 
                        type="email" 
                        value={form.emailOng} 
                        onChange={handleForm} 
                        placeholder="Digite o e-mail"
                        className="w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] border-white/80 bg-white/95 text-black transition-colors duration-200 shadow-white-glow placeholder:text-gray-600 focus:outline-none focus:border-[#ffd966] focus:bg-white/70 focus:shadow-yellow-glow-focus"
                    />
                </div>
                <div className="mb-3.5">
                    <label htmlFor="telefone" className="block text-black font-medium text-sm text-shadow">Telefone:</label>
                    <input 
                        id="telefone" 
                        name="telefone" 
                        type="text" 
                        value={form.telefone} 
                        onChange={handleForm} 
                        placeholder="Digite o telefone"
                        className="w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] border-white/80 bg-white/95 text-black transition-colors duration-200 shadow-white-glow placeholder:text-gray-600 focus:outline-none focus:border-[#ffd966] focus:bg-white/70 focus:shadow-yellow-glow-focus"
                    />
                </div>
                <div className="mb-3.5">
                    <label htmlFor="cnpj" className="block text-black font-medium text-sm text-shadow">CNPJ:</label>
                    <input 
                        id="cnpj" 
                        name="cnpj" 
                        type="text" 
                        value={form.cnpj} 
                        onChange={handleForm} 
                        placeholder="Digite o CNPJ"
                        className="w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] border-white/80 bg-white/95 text-black transition-colors duration-200 shadow-white-glow placeholder:text-gray-600 focus:outline-none focus:border-[#ffd966] focus:bg-white/70 focus:shadow-yellow-glow-focus"
                    />
                </div>
                <div className="mb-3.5">
                    <label htmlFor="endereco" className="block text-black font-medium text-sm text-shadow">Endereço:</label>
                    <input 
                        id="endereco" 
                        name="endereco" 
                        type="text" 
                        value={form.endereco} 
                        onChange={handleForm} 
                        placeholder="Digite o endereço"
                        className="w-full text-sm py-2.5 px-3 rounded-md border-[1.5px] border-white/80 bg-white/95 text-black transition-colors duration-200 shadow-white-glow placeholder:text-gray-600 focus:outline-none focus:border-[#ffd966] focus:bg-white/70 focus:shadow-yellow-glow-focus"
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="w-full text-base rounded-2xl py-2.5 mt-4 bg-black text-white font-semibold rounded-md cursor-pointer transition-colors hover:bg-gray-800"
                >
                    Cadastrar
                </button>

                <p className="mt-6 text-lg text-gray-500 text-center text-shadow">
                    Ao clicar em continuar, você concorda com os nossos 
                    <a href="https://youtu.be/LHqRwGTP2qQ?si=ORCAvf9YCwXQYFSk" target="_blank" rel="noopener noreferrer" className="text-black underline hover:underline"> Termos de Serviço</a> e 
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-black underline hover:underline"> Política de Privacidade</a>.
                </p>
                
                <p className="mt-6 text-lg text-gray-500 text-center text-shadow">
                    Já tem uma conta?{' '}
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
  )
}

export default MeuForm;