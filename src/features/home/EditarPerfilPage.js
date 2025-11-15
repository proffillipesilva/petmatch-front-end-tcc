import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, Save, User, Building } from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext'; 

// ==================================================================
// FORMULÁRIO DE EDIÇÃO - ADOTANTE (Com TODOS os campos)
// ==================================================================
const AdotanteForm = ({ initialData, user, token, login }) => {
    const [formData, setFormData] = useState({
        nomeAdotante: initialData.nomeAdotante || '',
        cpfAdotante: initialData.cpfAdotante || '',
        enderecoAdotante: initialData.enderecoAdotante || '',
        celularAdotante: initialData.celularAdotante || '',
        emailAdotante: initialData.emailAdotante || '', 
        descricaoOutrosAnimais: initialData.descricaoOutrosAnimais || '',
        preferencia: initialData.preferencia || '',
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        setFormData({
            nomeAdotante: initialData.nomeAdotante || '',
            cpfAdotante: initialData.cpfAdotante || '',
            enderecoAdotante: initialData.enderecoAdotante || '',
            celularAdotante: initialData.celularAdotante || '',
            emailAdotante: initialData.emailAdotante || '',
            descricaoOutrosAnimais: initialData.descricaoOutrosAnimais || '',
            preferencia: initialData.preferencia || '',
        });
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage({ type: '', text: '' });

        if (!user?.id || !token) {
            setStatusMessage({ type: 'error', text: 'Erro de autenticação. Tente logar novamente.' });
            setIsSubmitting(false);
            return;
        }

        try {
            // IMPORTANTE: Troque '/api/perfil/adotante' pela URL da sua API
            const response = await fetch(`/api/perfil/adotante/${user.id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    name: formData.nomeAdotante, 
                    endereco: formData.enderecoAdotante,
                    celular: formData.celularAdotante,
                    descricaoOutrosAnimais: formData.descricaoOutrosAnimais,
                    preferencia: formData.preferencia,
                    // CPF e Email NÃO SÃO ENVIADOS na atualização
                })
            });

            // Se a resposta não for JSON (ex: HTML de erro 404), vai falhar aqui
            const updatedUserData = await response.json();

            if (!response.ok) {
                // Se for JSON mas for um erro (ex: { "message": "Erro X" })
                throw new Error(updatedUserData.message || 'Falha ao salvar na API.');
            }

            login(updatedUserData, token); // Atualiza o localStorage
            setStatusMessage({ type: 'success', text: 'Perfil de adotante atualizado com sucesso!' });

        } catch (error) {
            console.error("Erro ao atualizar perfil (API Adotante):", error);
            
            // ==========================================================
            // NOVA DETECÇÃO DE ERRO (para o "Unexpected token <")
            // ==========================================================
            if (error instanceof SyntaxError) {
                // Isso acontece se o 'response.json()' falhar
                setStatusMessage({ type: 'error', text: 'Erro: O servidor retornou uma resposta inválida (não-JSON). Verifique a URL da API no código.' });
            } else {
                setStatusMessage({ type: 'error', text: `Falha ao atualizar: ${error.message}` });
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    // HTML do AdotanteForm (Agora com CPF não-editável)
    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
                <User className="w-6 h-6 mr-3 text-indigo-500" />
                Editar Perfil Pessoal
            </h2>
            
            {/* Campo Nome */}
            <div>
                <label htmlFor="nomeAdotante" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" id="nomeAdotante" name="nomeAdotante" value={formData.nomeAdotante || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Email (Não editável) */}
            <div>
                <label htmlFor="emailAdotante" className="block text-sm font-medium text-gray-500">E-mail (não pode ser alterado)</label>
                <input type="email" id="emailAdotante" name="emailAdotante" value={formData.emailAdotante || ''} readOnly disabled className="mt-1 block w-full border border-gray-200 rounded-lg shadow-sm p-3 bg-gray-100 text-gray-500" />
            </div>

            {/* ========================================================== */}
            {/* CAMPO CPF (Agora não-editável) */}
            {/* ========================================================== */}
            <div>
                <label htmlFor="cpfAdotante" className="block text-sm font-medium text-gray-500">CPF (não pode ser alterado)</label>
                <input type="text" id="cpfAdotante" name="cpfAdotante" value={formData.cpfAdotante || ''} readOnly disabled className="mt-1 block w-full border border-gray-200 rounded-lg shadow-sm p-3 bg-gray-100 text-gray-500" />
            </div>

            {/* Campo Celular */}
            <div>
                <label htmlFor="celularAdotante" className="block text-sm font-medium text-gray-700">Celular</label>
                <input type="text" id="celularAdotante" name="celularAdotante" value={formData.celularAdotante || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Endereço */}
            <div>
                <label htmlFor="enderecoAdotante" className="block text-sm font-medium text-gray-700">Endereço Completo</label>
                <input type="text" id="enderecoAdotante" name="enderecoAdotante" value={formData.enderecoAdotante || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Descrição Outros Animais */}
            <div>
                <label htmlFor="descricaoOutrosAnimais" className="block text-sm font-medium text-gray-700">Descrição sobre outros animais</label>
                <input type="text" id="descricaoOutrosAnimais" name="descricaoOutrosAnimais" value={formData.descricaoOutrosAnimais || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Preferência */}
            <div>
                <label htmlFor="preferencia" className="block text-sm font-medium text-gray-700">Preferência</label>
                <input type="text" id="preferencia" name="preferencia" value={formData.preferencia || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <FormStatus status={statusMessage} isSubmitting={isSubmitting} />
        </form>
    );
};
// ==================================================================
// FORMULÁRIO DE EDIÇÃO - ONG (Lógica 100% API/JWT)
// ==================================================================
const OngForm = ({ initialData, user, token, login }) => {
    // Agora o state 'form' tem todos os campos do seu cadastro
    const [formData, setFormData] = useState({
        nomeOng: initialData.nomeOng || '',
        nomeFantasiaOng: initialData.nomeFantasiaOng || '',
        razaoSocialOng: initialData.razaoSocialOng || '',
        emailOng: initialData.emailOng || '', // O email não deve ser editável
        telefone: initialData.telefone || '',
        celular: initialData.celular || '',
        cnpj: initialData.cnpj || '',
        endereco: initialData.endereco || '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        setFormData({
            nomeOng: initialData.nomeOng || '',
            nomeFantasiaOng: initialData.nomeFantasiaOng || '',
            razaoSocialOng: initialData.razaoSocialOng || '',
            emailOng: initialData.emailOng || '',
            telefone: initialData.telefone || '',
            celular: initialData.celular || '',
            cnpj: initialData.cnpj || '',
            endereco: initialData.endereco || '',
        });
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage({ type: '', text: '' });

        if (!user?.id || !token) {
            setStatusMessage({ type: 'error', text: 'Erro de autenticação. Tente logar novamente.' });
            setIsSubmitting(false);
            return;
        }

        try {
            // IMPORTANTE: Troque '/api/perfil/ong' pela URL da sua API
            const response = await fetch(`/api/perfil/ong/${user.id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.nomeOng, 
                    nomeFantasia: formData.nomeFantasiaOng,
                    razaoSocial: formData.razaoSocialOng,
                    telefone: formData.telefone,
                    celular: formData.celular,
                    endereco: formData.endereco,
                    // CNPJ e Email NÃO SÃO ENVIADOS na atualização
                })
            });

            // Se a resposta não for JSON (ex: HTML de erro 404), vai falhar aqui
            const updatedUserData = await response.json();

            if (!response.ok) {
                // Se for JSON mas for um erro (ex: { "message": "Erro X" })
                throw new Error(updatedUserData.message || 'Falha ao salvar na API.');
            }

            login(updatedUserData, token); // Atualiza o localStorage
            setStatusMessage({ type: 'success', text: 'Perfil da ONG atualizado com sucesso!' });

        } catch (error) {
            console.error("Erro ao atualizar perfil (API ONG):", error);
            
            // ==========================================================
            // NOVA DETECÇÃO DE ERRO (para o "Unexpected token <")
            // ==========================================================
            if (error instanceof SyntaxError) {
                // Isso acontece se o 'response.json()' falhar
                setStatusMessage({ type: 'error', text: 'Erro: O servidor retornou uma resposta inválida (não-JSON). Verifique a URL da API no código.' });
            } else {
                setStatusMessage({ type: 'error', text: `Falha ao atualizar: ${error.message}` });
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    // HTML do OngForm (Agora com CNPJ não-editável)
    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
                <Building className="w-6 h-6 mr-3 text-indigo-500" />
                Editar Perfil da ONG
            </h2>

            {/* Campo Nome */}
            <div>
                <label htmlFor="nomeOng" className="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" id="nomeOng" name="nomeOng" value={formData.nomeOng || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Email (Não editável) */}
            <div>
                <label htmlFor="emailOng" className="block text-sm font-medium text-gray-500">E-mail (não pode ser alterado)</label>
                <input type="email" id="emailOng" name="emailOng" value={formData.emailOng || ''} readOnly disabled className="mt-1 block w-full border border-gray-200 rounded-lg shadow-sm p-3 bg-gray-100 text-gray-500" />
            </div>

            {/* Campo Nome Fantasia */}
            <div>
                <label htmlFor="nomeFantasiaOng" className="block text-sm font-medium text-gray-700">Nome Fantasia</label>
                <input type="text" id="nomeFantasiaOng" name="nomeFantasiaOng" value={formData.nomeFantasiaOng || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Razão Social */}
            <div>
                <label htmlFor="razaoSocialOng" className="block text-sm font-medium text-gray-700">Razão Social</label>
                <input type="text" id="razaoSocialOng" name="razaoSocialOng" value={formData.razaoSocialOng || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* ========================================================== */}
            {/* CAMPO CNPJ (Agora não-editável) */}
            {/* ========================================================== */}
            <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-500">CNPJ (não pode ser alterado)</label>
                <input type="text" id="cnpj" name="cnpj" value={formData.cnpj || ''} readOnly disabled className="mt-1 block w-full border border-gray-200 rounded-lg shadow-sm p-3 bg-gray-100 text-gray-500" />
            </div>

            {/* Campo Celular */}
            <div>
                <label htmlFor="celular" className="block text-sm font-medium text-gray-700">Celular da ONG</label>
                <input type="text" id="celular" name="celular" value={formData.celular || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Telefone */}
            <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                <input type="text" id="telefone" name="telefone" value={formData.telefone || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Endereço */}
            <div>
                <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço Completo</label>
                <input type="text" id="endereco" name="endereco" value={formData.endereco || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            
            <FormStatus status={statusMessage} isSubmitting={isSubmitting} />
        </form>
    );
};

// ==================================================================
// Componente de Status (Sem alterações)
// ==================================================================
const FormStatus = ({ status, isSubmitting }) => {
    const statusClasses = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
    };
    
    return (
        <>
            {status.text && (
                <div className={`p-4 my-4 border-l-4 rounded-md ${statusClasses[status.type] || 'bg-gray-100'}`}>
                    <p className="font-semibold flex items-center">
                        {status.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
                        {status.text}
                    </p>
                </div>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white transition-colors duration-200 ${
                    isSubmitting
                        ? 'bg-indigo-300 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500'
                }`}
            >
                {isSubmitting ? (
                    <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Salvando...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5 mr-2" />
                        Salvar Alterações
                    </>
                )}
            </button>
        </>
    );
};

// ==================================================================
// PÁGINA PRINCIPAL (Lógica 100% AuthContext)
// ==================================================================
function EditarPerfilPage() {
    // 1. Pega os dados do AuthContext (que vêm do localStorage)
    const { user, token, login, isAuthenticated } = useAuth();
    
    // --- Renderização ---

    // Se o usuário não estiver logado (vem do useAuth)
    if (!isAuthenticated || !user) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="ml-3 text-lg text-red-600">Você precisa estar logado para editar seu perfil.</p>
            </div>
        );
    }
    
    // Se o usuário está logado, mas não tem 'tipo' (erro nos dados do localStorage)
    if (!user.tipo) {
         return (
             <div className="flex justify-center items-center h-screen bg-gray-50">
                 <p className="ml-3 text-lg text-gray-600">Não foi possível carregar o perfil (tipo de usuário não encontrado).</p>
             </div>
         );
    }

    // Se passou pelas verificações, este é o return principal
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
            <div className="w-full max-w-2xl mt-10">
                
                {user.tipo === 'ONG' && (
                    <OngForm 
                        initialData={user} // Os dados iniciais são o próprio usuário do localStorage
                        user={user} 
                        token={token} // Passa o token para a API
                        login={login} // Passa a função de atualizar o localStorage
                    />
                )}
                
                {user.tipo === 'ADOTANTE' && (
                    <AdotanteForm 
                        initialData={user} // Os dados iniciais são o próprio usuário do localStorage
                        user={user} 
                        token={token} // Passa o token para a API
                        login={login} // Passa a função de atualizar o localStorage
                    />
                )}
            </div>
        </div>
    );
}

export default EditarPerfilPage;