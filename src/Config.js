// Lógica para descobrir onde o site está rodando
const hostname = window.location.hostname;

// Se estiver rodando no seu computador (localhost ou 127.0.0.1)
const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

const GITHUB_USER = "JoelsonJose"; 
const GITHUB_REPO = "VamosJuntos";  

export const API_URL = isLocal 
  ? 'http://localhost:3001' 
  : `https://my-json-server.typicode.com/${GITHUB_USER}/${GITHUB_REPO}`; 