import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PetService from "../services/PetService"; // 🐾
import Frame1 from "../../splash/assets/Frame1.png"; // Ajuste o caminho (../) se necessário
import { useAuth } from "../../../shared/context/AuthContext";

const PetForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Lógica de permissão (igual)
  useEffect(() => {
    if (user && user.tipo !== "ONG") {
      console.warn("Acesso negado: Rota apenas para ONGs.");
      navigate("/adotar"); // 🐾 Redireciona para a lista (Já estava correto)
    }
  }, [user, navigate]);

  // Estado do formulário para Pet
  const [form, setForm] = useState({
    nome: "",
    especie: "",
    porte: "",
    idade: "",
    sexo: "", // Novo Campo Obrigatório (M ou F)
    raca: "", // Novo Campo (Opcional)
    cor: "",  // Novo Campo (Opcional)
    descricao: "", // Será enviado como 'observacoesAnimal'
    imagemUrl: ""
  });
  const [errors, setErrors] = useState({});

  // Handler único (igual)
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBack = () => navigate(-1);

  // Envio para o servidor
  const enviaServidor = async (e) => {
    e.preventDefault();
    setErrors({});
    const tempErrors = {};

    // --- 2. VALIDAÇÕES ---
    if (!form.nome) tempErrors.nome = "O nome é obrigatório!";
    if (!form.especie) tempErrors.especie = "A espécie é obrigatória!";
    if (!form.porte) tempErrors.porte = "O porte é obrigatório!";
    if (!form.sexo) tempErrors.sexo = "O sexo é obrigatório!"; // Validação nova
    if (!form.idade) tempErrors.idade = "A idade é obrigatória!";
    if (form.idade && form.idade < 0) tempErrors.idade = "Idade inválida.";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    if (!user || !user.id) {
      setErrors({ geral: "Erro de autenticação, faça login novamente." });
      return;
    }

    try {
      const payload = {
        nome: form.nome,
        idade: parseInt(form.idade, 10),
        
        // Valores exatos exigidos pelo Java (Case Sensitive)
        porte: form.porte,   // "Pequeno", "Médio", "Grande"
        especie: form.especie, // "Cachorro", "Gato"
        sexo: form.sexo,     // "M", "F"
        
        // Campos opcionais (Envia string vazia ou padrão se não preenchido)
        raca: form.raca || "Não definida",
        cor: form.cor || "Não informada",
        
        // Mapeamento de nome: Front(descricao) -> Back(observacoesAnimal)
        observacoesAnimal: form.descricao,

        // Objeto ONG (Estrutura aninhada)
        ong: {
          id: user.id
        },

        // Campos complexos que o Back pede (enviando vazio/null para não quebrar)
        fichaMedicaAnimal: null,
        fotosAnimais: [] 
        // OBS: Se quiser mandar a foto, precisaria saber a estrutura do FotoAnimalDTO.
        // Por enquanto, mandamos [] para garantir que o cadastro funcione.
      };

      console.log("Enviando payload para criar pet:", payload);
      await PetService.criarPet(payload); // 🐾
      
      // ****** ⬇️ CORREÇÃO APLICADA AQUI ⬇️ ******
      navigate("/adotar"); // 🐾 Volta para a lista de pets (era /pets)
      // ****** ⬆️ CORREÇÃO APLICADA AQUI ⬆️ ******

    } catch (err) {
      console.error("Falha ao cadastrar pet:", err);
      setErrors({
        geral: err.response?.data?.message || "Falha ao cadastrar pet.",
      });
    }
  };

  // Funções de Renderização (Adaptadas)
  
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
        min={type === "number" ? 0 : undefined}
      />
      {errors[id] && <p className="text-red-600 text-xs mt-1">{errors[id]}</p>}
    </div>
  );
  
  const renderSelect = (id, label, options) => (
    <div className="mb-3.5">
      <label htmlFor={id} className="block text-black font-medium text-sm">
        {label}:
      </label>
      <select
        id={id}
        name={id}
        value={form[id]}
        onChange={handleForm}
        className={`w-full text-base py-3.5 px-3 rounded-md border-[1.5px] ${
          errors[id] ? "border-red-500" : "border-white/80"
        } bg-white/95 text-black`}
      >
        <option value="" disabled>Selecione...</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      {errors[id] && <p className="text-red-600 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  const renderTextarea = (id, label) => (
    <div className="mb-3.5">
      <label htmlFor={id} className="block text-black font-medium text-sm">
        {label}:
      </label>
      <textarea
        id={id}
        name={id}
        value={form[id]}
        onChange={handleForm}
        placeholder={`Descreva o pet...`}
        rows={4}
        className={`w-full text-base py-3.5 px-3 rounded-md border-[1.5px] ${
          errors[id] ? "border-red-500" : "border-white/80"
        } bg-white/95 text-black`}
      />
      {errors[id] && <p className="text-red-600 text-xs mt-1">{errors[id]}</p>}
    </div>
  );


  if (!user || user.tipo !== "ONG") {
    return null; // Não renderiza nada se não for ONG
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen p-5 sm:p-20 md:p-10 text-[#333]">
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
          <h2 className="text-2xl font-bold">Cadastrar Novo Pet</h2>
          <h2 className="text-sm font-bold">
            Preencha os dados do animal para adoção
          </h2>
        </div>

       <form onSubmit={enviaServidor} className="w-full">
          {renderInput("nome", "Nome do Pet")}
          
          {/* O Backend exige Cachorro/Gato com maiúscula */}
          {renderSelect("especie", "Espécie", ["Cachorro", "Gato"])}
          
          {/* O Backend exige Pequeno/Médio/Grande com acento */}
          {renderSelect("porte", "Porte", ["Pequeno", "Médio", "Grande"])}
          
          {/* NOVO: Campo Sexo Obrigatório (M/F) */}
          {/* Mostra Macho/Fêmea pro usuário, mas envia M/F pro backend */}
          {renderSelect("sexo", "Sexo", ["Macho", "Fêmea"], ["M", "F"])}

          {renderInput("idade", "Idade (em anos)", "number")}
          
          {/* Campos opcionais novos */}
          {renderInput("raca", "Raça (Opcional)")}
          {renderInput("cor", "Cor (Opcional)")}

          {/* Imagem (Apenas visual por enquanto, não será salva no back sem DTO correto) */}
          {renderInput("imagemUrl", "URL da Foto (Opcional)")}
          
          {renderTextarea("descricao", "Descrição / Observações")}

          {errors.geral && (
            <p className="text-red-600 text-sm text-center mt-2 bg-red-100 p-2 rounded">
              {errors.geral}
            </p>
          )}

          <button
            type="submit"
            className="w-full text-base rounded-2xl py-2.5 mt-4 bg-black text-white font-semibold cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            Cadastrar Pet
          </button>
        </form>
      </div>
    </div>
  );
};

export default PetForm;