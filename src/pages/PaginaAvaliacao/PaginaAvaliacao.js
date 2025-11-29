import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import StarRatingInput from '../../components/StarRatingInput/StarRatingInput';
import './PaginaAvaliacao.css';
import { API_URL } from '../../Config';

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
  const { caronaId } = useParams();

  const [dados, setDados] = useState(mockDadosDaViagem);
  const [avaliacoes, setAvaliacoes] = useState({});

  useEffect(() => {
    // No futuro, você pode buscar os dados da carona da API
    // fetch(`${API_URL}/caronas/${caronaId}`).then(res => res.json()).then(data => {
    //   // A API precisaria retornar os passageiros da carona
    //   setDados(data);
    // });
    // Por enquanto, usamos o mock, mas com o ID correto.
    setDados(prev => ({ ...prev, id: caronaId }));
  }, [caronaId]);


  const handleRatingChange = (passengerId, rating) => {
    setAvaliacoes(prev => ({
      ...prev,
      [passengerId]: {
        ...prev[passengerId],
        rating: rating
      }
    }));
  };

  const handleCommentChange = (passengerId, comentario) => {
    setAvaliacoes(prev => ({
      ...prev,
      [passengerId]: {
        ...prev[passengerId],
        comentario: comentario
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allRated = dados.passageiros.every(
      p => avaliacoes[p.id] && avaliacoes[p.id].rating > 0
    );

    if (!allRated) {
      alert("Por favor, avalie todos os passageiros com pelo menos 1 estrela.");
      return;
    }

    try {
      // 1. Enviar as avaliações dos passageiros (opcional, se tiver o endpoint)
      console.log("Enviando avaliações:", {
        rideId: dados.id,
        evaluations: avaliacoes
      });
      // await fetch('/api/avaliar-passageiros', { method: 'POST', body: JSON.stringify(avaliacoes) });

      // 2. Atualizar o status da carona para "Finalizada"
      const response = await fetch(`${API_URL}/caronas/${caronaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Finalizada'
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar o status da carona.');
      }

      // 3. Notificação de Confirmação
      alert("Avaliações registradas e carona finalizada com sucesso!");

      // 4. Redirecionar o usuário
      navigate('/minhascaronas');

    } catch (error) {
      console.error("Erro no processo de avaliação:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
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

          <div className="lista-passageiros-avaliar">
            {dados.passageiros.map(passageiro => (
              <div key={passageiro.id} className="card-passageiro-avaliar">
                <div className="info-passageiro">
                  <img src={passageiro.foto} alt={passageiro.nome} className="avaliar-foto-passageiro" />
                  <span className="nome-passageiro">{passageiro.nome}</span>
                </div>

                <StarRatingInput
                  rating={avaliacoes[passageiro.id]?.rating || 0}
                  setRating={(rating) => handleRatingChange(passageiro.id, rating)}
                />

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