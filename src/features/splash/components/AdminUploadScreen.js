import React, { useState, useEffect } from 'react';
import { FaFileCsv, FaUpload, FaSpinner, FaPaw, FaTerminal, FaSkull, FaBiohazard } from 'react-icons/fa';
// Removido: import publicApi from "../../../shared/utils/publicApi";
// Removido: import useAuth from "...";
// (Vamos focar apenas no front-end por enquanto)

/**
 * Simula uma chamada de API para o seu back-end.
 * Em um app real, você usaria o 'publicApi.post' do seu outro arquivo.
 */
const mockApiUpload = (formData) => {
  return new Promise((resolve, reject) => {
    const file = formData.get('arquivoCsv');
    console.log("MOCK_API: Recebido arquivo:", file.name);
    console.log("MOCK_API: Tamanho:", file.size, "bytes");

    // Simula um tempo de upload
    setTimeout(() => {
      // Simula um erro aleatório para testar
      if (Math.random() > 0.8) {
        console.error("MOCK_API: Falha simulada!");
        reject(new Error("ERRO 500: Falha na injeção de dados. Kernel instável."));
      } else {
        console.log("MOCK_API: Upload completo.");
        resolve({ message: "Dados do CSV assimilados com sucesso." });
      }
    }, 2000); // 2 segundos de delay
  });
};


const AdminUploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('IDLE'); // IDLE, SCANNING, UPLOADING, SUCCESS, ERROR
  const [log, setLog] = useState([]);
  const [fileName, setFileName] = useState('...nenhum arquivo selecionado...');

  // Função para adicionar linhas ao log falso
  const addLog = (message) => {
    setLog(prev => [...prev, `> ${message}`]);
  };

  // Efeito para "escanear" o arquivo quando selecionado
  useEffect(() => {
    if (status !== 'SCANNING') return;

    addLog(`Iniciando varredura em: ${fileName}`);
    const scanLines = [
      "Verificando integridade de bytes...",
      "Analisando cabeçalhos CSV... OK.",
      "Procurando por anomalias... 0 encontradas.",
      "Buscando assinaturas de vírus... NENHUMA.",
      "Conectando ao banco de dados de pets...",
      "Varredura concluída. Arquivo pronto para injeção.",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < scanLines.length) {
        addLog(scanLines[index]);
        index++;
      } else {
        clearInterval(interval);
        setStatus('READY_TO_UPLOAD');
        addLog("Status: PRONTO PARA UPLOAD.");
      }
    }, 350); // Delay para simular o "scan"

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, fileName]);


  // Manipulador para quando o usuário seleciona um arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "text/csv") {
        addLog("ERRO: TIPO DE ARQUIVO INVÁLIDO. APENAS .CSV PERMITIDO.");
        setStatus('ERROR');
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setLog([]); // Limpa o log
      addLog(`Arquivo detectado: ${file.name}`);
      setStatus('SCANNING'); // Inicia o "scan"
    }
  };

  // Manipulador para o botão de upload
  const handleUpload = async () => {
    if (!selectedFile || status !== 'READY_TO_UPLOAD') {
      addLog("AVISO: Nenhum arquivo pronto para upload.");
      return;
    }

    setStatus('UPLOADING');
    addLog("Iniciando injeção de dados... ");

    const formData = new FormData();
    formData.append('arquivoCsv', selectedFile);

    try {
      // Aqui você usaria sua 'publicApi' real
      // const response = await publicApi.post("/v1/api/seu-endpoint-csv", formData);
      const response = await mockApiUpload(formData); // Usando nosso mock

      addLog("...Upload concluído.");
      addLog(`Resposta do servidor: ${response.message}`);
      addLog("SISTEMA: Dados assimilados.");
      setStatus('SUCCESS');

    } catch (error) {
      console.error("Erro no upload:", error);
      addLog(`### FALHA CRÍTICA ###`);
      addLog(error.message || "Conexão perdida com o mainframe.");
      setStatus('ERROR');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'ERROR': return 'text-red-500 animate-pulse';
      case 'SUCCESS': return 'text-green-300';
      case 'UPLOADING':
      case 'SCANNING':
        return 'text-yellow-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    // Fundo preto, fonte mono (estilo terminal)
    <div className="bg-black text-green-400 font-mono min-h-screen p-4 sm:p-8 flex items-center justify-center selection:bg-green-400 selection:text-black">
      
      {/* O "Computador" / Janela do Terminal */}
      <div className="w-full max-w-4xl bg-gray-900 border-2 border-green-500 shadow-lg shadow-green-500/20">
        
        {/* Barra de Título Falsa */}
        <div className="bg-green-500 text-black p-2 flex justify-between items-center text-sm">
          <span className="flex items-center gap-2">
            <FaTerminal />
            C:\PETMATCH\ADMIN\DATA_INJECTOR.EXE
          </span>
          <div className="flex gap-1">
            <span className="w-4 h-4 bg-gray-900 border border-black">_</span>
            <span className="w-4 h-4 bg-gray-900 border border-black">[]</span>
            <span className="w-4 h-4 bg-gray-900 border border-black">X</span>
          </div>
        </div>

        {/* Conteúdo do Terminal */}
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl text-red-500 animate-pulse flex items-center gap-2"><FaBiohazard /> PETMATCH_ADMIN_ROOT</h1>
              <p className="text-sm">Interface de Injeção de Dados CSV - Acesso Restrito</p>
            </div>
            {/* A única coisa que lembra o "PetMatch" */}
            <FaPaw className="text-5xl text-white opacity-50" />
          </div>

          <hr className="border-green-700 my-4" />

          {/* Seção de Upload */}
          <div className="mb-4">
            <label htmlFor="csv-upload" className="block text-lg mb-2">1. Selecionar Alvo (Somente .csv):</label>
            <div className="relative border-2 border-dashed border-green-600 p-6 text-center bg-black/30">
              <input 
                type="file" 
                id="csv-upload" 
                accept=".csv"
                onChange={handleFileChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FaFileCsv className="text-5xl mx-auto mb-2 text-green-300" />
              <p className="text-sm">{fileName}</p>
            </div>
          </div>

          {/* Seção do Botão */}
          <div className="mb-4">
            <label className="block text-lg mb-2">2. Iniciar Injeção:</label>
            <button
              onClick={handleUpload}
              disabled={status !== 'READY_TO_UPLOAD'}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white p-4 text-xl border-2 border-red-800 hover:bg-red-500 disabled:opacity-50 disabled:bg-gray-700 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-300 shadow-lg"
            >
              {status === 'UPLOADING' ? <FaSpinner className="animate-spin" /> : <FaSkull />}
              {status === 'UPLOADING' ? 'INJETANDO DADOS...' : 'EXECUTAR UPLOAD'}
            </button>
          </div>

          {/* Console de Log Falso */}
          <div>
            <label className="block text-lg mb-2">3. Log do Sistema:</label>
            <div className="w-full h-64 bg-black p-4 border border-green-800 overflow-y-auto text-sm">
              <p>Status Atual: <span className={getStatusColor()}>{status}</span></p>
              {log.map((line, index) => (
                <p key={index} className="whitespace-pre-wrap">{line}</p>
              ))}
              {/* O cursor piscando */}
              {status !== 'UPLOADING' && status !== 'SCANNING' && (
                 <span className="w-2 h-4 bg-green-400 inline-block animate-pulse ml-1"></span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminUploadScreen;