import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import necessário
import AuthImg from '../../features/splash/assets/Auth.png';
import Frame1 from "../../features/splash/assets/Frame1.png";

const Home = () => {
    const navigate = useNavigate(); // ✅ Hook para redirecionar

    const handleCadastroClick = () => {
        navigate('/tipo-cadastro'); // ✅ Leva para a tela de tipo de cadastro
    };

    return (
        <div 
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center p-5 sm:p-20 md:p-10 text-[#333]"
            style={{
                backgroundImage: `url(${AuthImg})`
            }}
        >
            <div className="relative z-10 w-full max-w-3xl sm:max-w-[700px] xl:max-w-[900px] min-w-[320px] p-10 md:p-12 bg-white/95 rounded-2xl shadow-2xl animate-slideIn">
                
                <div className="flex flex-col items-center mb-7 text-black font-bold text-3xl text-shadow">
                    <h2 className="logo-title text-6xl font-bold">PetMatch</h2>
                    <img src={Frame1} alt="logo" className="max-w-[200px] mt-2.5" /> 
                    <h2 className="text-2xl font-bold mt-4">Bem-vindo(a) ao PetMatch!</h2>
                    <h2 className="text-sm font-bold text-gray-600 mt-1">
                        Descubra a história e as novidades do nosso site
                    </h2>
                </div>

                <h2 className="text-2xl font-bold mb-3 text-black">História do nosso site:</h2>
                <p className="mb-4 text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
                <p className="text-gray-700 text-base">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </p>
                
                <h2 className="text-xl font-bold mt-8 mb-4 text-black">Nossos Destaques</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-sky-100 p-4 rounded-lg shadow-md h-32 flex items-center justify-center font-semibold text-lg border-2 border-sky-200">Encontre seu Pet</div>
                    <div className="bg-sky-100 p-4 rounded-lg shadow-md h-32 flex items-center justify-center font-semibold text-lg border-2 border-sky-200">Processo de Adoção</div>
                    <div className="bg-sky-100 p-4 rounded-lg shadow-md h-32 flex items-center justify-center font-semibold text-lg border-2 border-sky-200">Apoie a Causa</div>
                    <div className="bg-sky-100 p-4 rounded-lg shadow-md h-32 flex items-center justify-center font-semibold text-lg border-2 border-sky-200">Depoimentos</div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleCadastroClick} // ✅ Aqui é o clique que redireciona
                        className="w-full sm:w-auto text-base rounded-2xl py-2.5 px-6 bg-black text-white font-semibold cursor-pointer transition-colors hover:bg-gray-800"
                    >
                        Comece a Adotar Agora!
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Home;