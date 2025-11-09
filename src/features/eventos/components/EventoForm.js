// --- ⚠️ 1. ADICIONE 'useEffect' NA IMPORTAÇÃO ---
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EventoService from "../services/EventoService";
// (Lembre-se que você corrigiu este caminho)
import Frame1 from "../../splash/assets/Frame1.png";

// Importar o useAuth (caminho baseado no seu EventoForm.js antigo)
import { useAuth } from "../../../shared/context/AuthContext";

/**
 * Converte uma string de data/hora do formato "dd/MM/yyyy HH:mm"
 * para o formato ISO "yyyy-MM-ddTHH:mm".
 * @param {string} dateTimeString - A data no formato "dd/MM/yyyy HH:mm".
 * @returns {string|null} A data no formato "yyyy-MM-ddTHH:mm" ou null se o formato for inválido.
 */
function parseBrazilianDateTime(dateTimeString) {
  if (!dateTimeString) return null;
  // ... (resto da sua função)
  const parts = dateTimeString.split(" ");
  if (parts.length !== 2) return null;
  const dateParts = parts[0].split("/");
  if (dateParts.length !== 3) return null;
  const timeParts = parts[1].split(":");
  if (timeParts.length !== 2) return null;
  const [day, month, year] = dateParts;
  const [hour, minute] = timeParts;
  if (
    year.length !== 4 ||
    month.length !== 2 ||
    day.length !== 2 ||
    hour.length !== 2 ||
    minute.length !== 2
  ) {
    return null;
  }
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

const EventoForm = () => {
  const navigate = useNavigate();
  // (Seu context usa 'user.tipo')
  const { user } = useAuth();

  // --- ⚠️ 2. ADICIONE ESTE BLOCO DE CÓDIGO ---
  // Este hook verifica a permissão assim que o componente carrega
  useEffect(() => {
    // Se o usuário estiver carregado E não for uma ONG
    if (user && user.tipo !== "ONG") {
      console.warn("Acesso negado: Rota apenas para ONGs.");
      navigate("/eventos"); // Envia o Adotante de volta para a lista
    }
  }, [user, navigate]); // Roda sempre que 'user' ou 'navigate' mudarem
  // --- FIM DO BLOCO ---

  const [form, setForm] = useState({
    nome: "",
    dataHora: "",
    endereco: "",
  });

  const [errors, setErrors] = useState({});

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBack = () => navigate(-1);

  const enviaServidor = async (e) => {
    e.preventDefault();
    setErrors({});
    const tempErrors = {};

    if (!form.nome) tempErrors.nome = "O nome do evento é obrigatório!";
    if (!form.dataHora) tempErrors.dataHora = "A data e hora são obrigatórias!";
    if (!form.endereco) tempErrors.endereco = "O endereço é obrigatório!";

    const isoCompliantDateTime = parseBrazilianDateTime(form.dataHora);

    if (!isoCompliantDateTime && form.dataHora) {
      tempErrors.dataHora = "Formato de data inválido. Use dd/MM/yyyy HH:mm";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // (Sua lógica de 'user.id' para 'idOng' estava correta)
    if (!user || !user.id) {
      console.error("Erro: ID do usuário ONG não encontrado.");
      setErrors({ geral: "Erro de autenticação, faça login novamente." });
      return;
    }

    try {
      const localDate = new Date(isoCompliantDateTime);
      const dataHoraISO_UTC = localDate.toISOString();

      const payload = {
        nome: form.nome,
        dataHora: dataHoraISO_UTC,
        endereco: form.endereco,
        idOng: user.id,
      };

      console.log("Enviando payload para criar evento:", payload);

      // (Lembre-se que seu service chama 'criarEvento')
      await EventoService.criarEvento(payload);

      navigate("/eventos");
    } catch (err) {
      console.error("Falha ao cadastrar evento:", err);
      setErrors({
        geral: err.response?.data?.message || "Falha ao criar evento.",
      });
    }
  };

  const renderInput = (id, label, type = "text") => (
    <div className="mb-3.5">
      <label htmlFor={id} className="block text-black font-medium text-sm">
        {label}:
      </label>
      <input
        id={id}
        name={id}
        type={id === "dataHora" ? "text" : type}
        value={form[id]}
        onChange={handleForm}
        placeholder={
          id === "dataHora"
            ? "dd/MM/yyyy HH:mm"
            : `Digite ${label.toLowerCase()}`
        }
        className={`w-full text-base py-3.5 px-3 rounded-md border-[1.5px] ${
          errors[id] ? "border-red-500" : "border-white/80"
        } bg-white/95 text-black`}
      />
      {errors[id] && <p className="text-red-600 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  // --- ⚠️ 3. ADICIONE ESTA VERIFICAÇÃO ---
  // Impede que o formulário apareça rapidamente antes do redirecionamento
  if (!user || user.tipo !== "ONG") {
    return null; // Ou um <Spinner /> se preferir
  }
  // --- FIM DA VERIFICAÇÃO ---

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
          <h2 className="text-2xl font-bold">Cadastrar Novo Evento</h2>
          <h2 className="text-sm font-bold">
            Preencha os dados para criar um novo evento
          </h2>
        </div>

        <form onSubmit={enviaServidor} className="w-full">
          {renderInput("nome", "Nome do Evento")}
          {renderInput("dataHora", "Data e Hora", "text")}
          {renderInput("endereco", "Endereço")}

          {errors.geral && (
            <p className="text-red-600 text-sm text-center mt-2">
              {errors.geral}
            </p>
          )}

          <button
            type="submit"
            className="w-full text-base rounded-2xl py-2.5 mt-4 bg-black text-white font-semibold cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            Cadastrar Evento
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventoForm;