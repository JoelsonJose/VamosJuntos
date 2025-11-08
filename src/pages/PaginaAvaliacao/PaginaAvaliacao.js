import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import StarRatingInput from '../../components/StarRatingInput/StarRatingInput';
import './PaginaAvaliacao.css'; 

// Exemplo de dados da VIAGEM
const mockDadosDaViagem = {
  id: 123,
  motorista: { nome: "Homero Flávio" },
  passageiros: [
    { id: 101, nome: "João Gomes", foto: "https://placehold.co/100x100/f0e6ff/a100ff?text=JG" },
    { id: 102, nome: "Gustavo Levi", foto: "https://placehold.co/100x100/f0e6ff/a100ff?text=GL" },
    { id: 103, nome: "Michele Dario", foto: "https://placehold.co/100x100/f0e6ff/a100ff?text=MD" },
    { id: 104, nome: "Júlio Azevedo", foto: "https://placehold.co/100x100/f0e6ff/a100ff?text=JA" }
  ]
};

export default function PaginaAvaliacao() {
  const navigate = useNavigate();
  // const { rideId } = useParams(); // Pega o ID da URL (ex: /avaliar/123)
  
  const dados = mockDadosDaViagem; // Usando dados de exemplo

  // --- MUDANÇA NA LÓGICA DE ESTADO ---
  // Em vez de um 'rating', guardamos um objeto de avaliações
  // Ex: { 101: { rating: 4, comentario: "..." }, 102: { rating: 5 } }
  const [avaliacoes, setAvaliacoes] = useState({});

  // Função para atualizar a nota de um passageiro específico
  const handleRatingChange = (passengerId, rating) => {
    setAvaliacoes(prev => ({
      ...prev,
      [passengerId]: {
        ...prev[passengerId], // Mantém o comentário, se já existir
        rating: rating
      }
    }));
  };

  // Função para atualizar o comentário de um passageiro específico
  const handleCommentChange = (passengerId, comentario) => {
    setAvaliacoes(prev => ({
      ...prev,
      [passengerId]: {
        ...prev[passengerId], // Mantém a nota, se já existir
        comentario: comentario
      }
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se todos os passageiros foram avaliados (pelo menos 1 estrela)
    const allRated = dados.passageiros.every(
      p => avaliacoes[p.id] && avaliacoes[p.id].rating > 0
    );

    if (!allRated) {
      alert("Por favor, avalie todos os passageiros com pelo menos 1 estrela.");
      return;
    }

    // 1. Enviar os dados para o backend
    //    (O backend receberá um objeto com as avaliações)
    console.log("Enviando avaliações:", {
      rideId: dados.id,
      evaluations: avaliacoes
    });
    // fetch('/api/avaliar-passageiros', { method: 'POST', body: JSON.stringify(avaliacoes) })

    // 2. Notificação de Confirmação
    alert("Avaliações registradas com sucesso!");

    // 3. Redirecionar o usuário
    navigate('/rotas'); // Leva de volta para o histórico
  };

  return (
    <div className="pagina-avaliar-container">
      <Sidebar />
      <main className="conteudo-avaliar">
        <form className="card-avaliacao-form-motorista" onSubmit={handleSubmit}>
          
          <div className="avaliar-header-motorista">
            <h2>Como foi sua viagem?</h2>
            <h1>Avalie seus passageiros</h1>
            <p>Sua avaliação é importante para manter a comunidade segura.</p>
          </div>
          
          {/* --- LISTA DE PASSAGEIROS PARA AVALIAR --- */}
          <div className="lista-passageiros-avaliar">
            {dados.passageiros.map(passageiro => (
              <div key={passageiro.id} className="card-passageiro-avaliar">
                <div className="info-passageiro">
                  <img src={passageiro.foto} alt={passageiro.nome} className="avaliar-foto-passageiro" />
                  <span className="nome-passageiro">{passageiro.nome}</span>
                </div>
                
                {/* Estrelas para este passageiro */}
                <StarRatingInput 
                  rating={avaliacoes[passageiro.id]?.rating || 0}
                  setRating={(rating) => handleRatingChange(passageiro.id, rating)}
                />
                
                {/* Comentário (opcional) para este passageiro */}
                <textarea
                  className="comentario-passageiro"
                  placeholder={`Deixar um comentário para ${passageiro.nome} (opcional)`}
                  value={avaliacoes[passageiro.id]?.comentario || ""}
                  onChange={(e) => handleCommentChange(passageiro.id, e.target.value)}
                />
              </div>
            ))}
          </div>


          <button type="submit" className="btn-enviar-avaliacao">
            Enviar Avaliações
          </button>
          
        </form>
      </main>
      <BotaoAcessibilidade />
    </div>
  );
}