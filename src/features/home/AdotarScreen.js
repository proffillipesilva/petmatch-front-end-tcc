import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import necessário
import AuthImg from '../../features/splash/assets/Auth.png';
import Frame1 from "../../features/splash/assets/Frame1.png";
import PetCard from '../animais/PetCard';
import AddPetCard from '../animais/AddPetCard';
import { useAuth } from '../../shared/context/AuthContext';

const petsMock = [
    { 
        id: 1, 
        nome: "Rex", 
        raca: "Labrador", 
        idade: "2 anos", 
        descricao: "Rex é dócil, brincalhão e precisa de espaço para correr. Ideal para famílias com quintal.", 
        imagemUrl: 'https://via.placeholder.com/200x180/007bff/FFFFFF?text=Rex'
    },
    { 
        id: 2, 
        nome: "Mimi", 
        raca: "Siamês", 
        idade: "1 ano", 
        descricao: "Mimi é uma gata calma, carinhosa e adora ficar no colo. Perfeita para apartamentos e idosos.", 
        imagemUrl: 'https://via.placeholder.com/200x180/fd7e14/FFFFFF?text=Mimi'
    },
    { 
        id: 3, 
        nome: "Thor", 
        raca: "Vira-lata", 
        idade: "4 meses", 
        descricao: "Thor é um filhote cheio de energia, ótimo com crianças e outros animais. Será de porte médio.", 
        imagemUrl: 'https://via.placeholder.com/200x180/28a745/FFFFFF?text=Thor'
    },
];


function AdotarScreen() {
    const navigate = useNavigate();
    
    // RESTAURADO/CORRIGIDO: Uso do hook de autenticação
    const { user, isAuthenticated } = useAuth(); 
    
    // Variáveis de Perfil
    const isONG = isAuthenticated && user?.perfil === 'ONG';

    // Função para navegar para o formulário de cadastro de pet (apenas para ONGs)
    const handleAddPetClick = () => {
        navigate('/cadastrar-pet'); // Você precisará criar esta rota no seu App.js
    };

    // Função que será chamada pelo botão "Adotar" de cada PetCard (para Adotantes)
    const handleAdotarClick = (petId) => {
        if (isAuthenticated && user?.perfil === 'ADOTANTE') {
            navigate(`/adotar/${petId}`); 
        } else {
            alert('Faça login como adotante para iniciar o processo de adoção!');
            navigate('/login'); 
        }
    };


    return (
        // Container Principal do Fundo (Mantido)
        <div 
            className="min-h-screen" 
            style={{
                backgroundImage: `url(${AuthImg})`, 
                backgroundSize: 'cover',             
                backgroundPosition: 'center',        
                backgroundRepeat: 'no-repeat',       
            }}
        >
            
            {/* Container de Conteúdo: Centraliza e aplica padding no conteúdo (cards) */}
            <div className="max-w-6xl mx-auto p-4 pt-24"> 
                
                <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
                    {isONG ? "Gerenciar Seus Pets" : "Encontre seu Novo Amigo!"}
                </h1>
                
                {/* GRID PRINCIPAL: Mantido o estilo de grade */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    
                    {/* 1. Card "Adicionar Animal": Mantido o estilo e a condição */}
                    {isONG && <AddPetCard onAddPetClick={handleAddPetClick} />}

                    {/* 2. Lista de Cards de Pets: Mantido o estilo */}
                    {petsMock.map(pet => (
                        <PetCard 
                            key={pet.id} 
                            pet={pet} 
                            onAdotarClick={handleAdotarClick} 
                        />
                    ))}
                    
                </div>
            </div>
        </div>
    );
}

export default AdotarScreen;