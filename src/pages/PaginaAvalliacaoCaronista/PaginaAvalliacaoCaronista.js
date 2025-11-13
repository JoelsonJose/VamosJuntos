import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import StarRatingInput from '../../components/StarRatingInput/StarRatingInput';
import './PaginaAvalliacaoCaronista.css'; // Vamos criar este CSS

// Exemplo de dados (no app real, você buscaria isso usando o ID da carona)
const mockDadosCarona = {
  id: 123,
  tipo: 'motorista', // 'motorista' ou 'caronista'
  nome: "Lucas Ximenes",
  foto: "https://placehold.co/100x100/f0e6ff/a100ff?text=LX" // Use a foto real
};


export default function PaginaAvaliacao() {
  const navigate = useNavigate();
  // const { rideId } = useParams(); // Pega o ID da URL (ex: /avaliar/123)

  // Estados para o formulário
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");

  const dados = mockDadosCarona; // Usando dados de exemplo

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Por favor, selecione pelo menos uma estrela.");
      return;
    }

    // 1. Enviar os dados para o backend
    console.log({
      rideId: dados.id,
      rating: rating,
      comment: comentario,
    });
    // fetch('/api/avaliar', { method: 'POST', body: ... })

    // 2. Notificação de Confirmação
    alert("Sua avaliação foi registrada.");

    // 3. Redirecionar o usuário
    navigate('/caronas'); // Leva de volta para o histórico
  };

  return (
    <div className="pagina-avaliar-container">
      <Sidebar />
      <main className="conteudo-avaliar">
        <form className="card-avaliacao-form" onSubmit={handleSubmit}>
          
          <div className="avaliar-header">
            <img src={dados.foto} alt={dados.nome} className="avaliar-foto" />
            <h2>Avalie sua viagem com</h2>
            <h1>{dados.nome}</h1>
            <p>Como foi sua experiência como {dados.tipo}?</p>
          </div>

          {/* Componente de Estrelas */}
          <StarRatingInput rating={rating} setRating={setRating} />

          {/* Comentário Opcional */}
          <div className="grupo-comentario">
            <label htmlFor="comentario">Deixe um comentário (opcional):</label>
            <textarea
              id="comentario"
              placeholder="Ex: Ótima motorista! Muito pontual e direção segura."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-enviar-avaliacao">
            Enviar Avaliação
          </button>
          
        </form>
      </main>
      <BotaoAcessibilidade />
    </div>
  );
}