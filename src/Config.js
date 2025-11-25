// src/config.js

const hostname = window.location.hostname;

// Verifica se está rodando no seu PC
const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

// --- AQUI ESTÁ O LINK CORRIGIDO ---
// Adicionei o '/api/v1' que é o padrão do MockAPI
const MOCK_API_URL = 'https://6925b90782b59600d724eb32.mockapi.io/api/v1'; 

export const API_URL = isLocal 
  ? 'http://localhost:3001' 
  : MOCK_API_URL;