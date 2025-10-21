// src/services/AdotanteService.js

// Importa a instância de API SEM o interceptor de Token JWT.
import publicApi from "../../../shared/utils/publicApi"; 
// Certifique-se de que o caminho de importação está correto.

/**
 * Serviço de API específico para operações de Adotante, como o registro.
 */
const AdotanteService = {

    async registerAdotante(registerData) {
        
        // Obtém o valor da API Key do seu .env
        const REGISTRY_API_KEY = process.env.REACT_APP_API_KEY; 
        
        if (!REGISTRY_API_KEY) {
            console.error("ERRO: REACT_APP_API_KEY não está definida no arquivo .env.");
            throw new Error("Erro de configuração. Chave de API do Back-end não encontrada.");
        }
        
        try {
            const endpoint = "/v1/api/usuarios/adotante";

            // 🛑 CORREÇÃO DO ERRO 403 - TENTATIVA 4: USANDO Authorization: Bearer 🛑
            // Última tentativa de Front-end. Isso pode ser necessário se o Back-end usa o filtro JWT
            // para autenticar a chave de serviço.
            const response = await publicApi.post(endpoint, registerData, {
                headers: {
                    // Enviando a chave de API no formato de token
                    'Authorization': `Bearer ${REGISTRY_API_KEY}`
                }
            });

            // Assumimos que a resposta.data agora contém o token JWT do novo usuário
            return response.data;
        } catch (error) {
            console.error("Erro no registro de adotante:", error.response || error);
            
            let errorMessage = "Erro ao registrar. Por favor, tente novamente.";
            
            if (error.response) {
                if (error.response.status === 403) {
                    // Mensagem de erro indicando que o problema é de segurança
                    errorMessage = "Falha de Permissão (403). O Back-end exige uma credencial que não foi reconhecida. A rota precisa ser liberada no Spring Security.";
                } else if (error.response.status === 409) {
                    errorMessage = "Este email ou CPF já está registrado. Por favor, use outro.";
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = `Erro ao cadastrar: Status ${error.response.status}`;
                }
            }
            
            throw new Error(errorMessage);
        }
    },
};

export default AdotanteService;