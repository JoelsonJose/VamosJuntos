// src/config.js

const hostname = window.location.hostname;
const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

// --- CORREÇÃO: URL SEM O /api/v1 ---
const MOCK_API_URL = 'https://692c5dcac829d464006f5cb2.mockapi.io'; 

export const API_URL = isLocal 
  ? 'http://localhost:3001' 
  : MOCK_API_URL;