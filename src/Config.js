

const isLocal = window.location.hostname === "localhost";

export const API_URL = isLocal 
  ? 'http://localhost:3001' 
  : 'https://my-json-server.typicode.com/JoelsonJose/VamosJuntos'; 

fetch(`${API_URL}/rotas`) 