import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import StarRatingInput from '../../components/StarRatingInput/StarRatingInput';
import './PaginaAvalliacaoCaronista.css'; 
import { API_URL } from '../../Config'; // Importando para conectar com o banco
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

// Exemplo de dados (Mantive seu mock visual)
const mockDadosCarona = {
  id: 123,
  tipo: 'motorista', 
  nome: "Lucas Ximenes",
  foto: "https://placehold.co/100x100/f0e6ff/a100ff?text=LX" 
};

export default function PaginaAvaliacaoCaronista() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [modalConfig, setModalConfig] = useState({
      isOpen: false,
      title: '',
      message: '',
      isAlertOnly: false,
      onConfirm: null
    });
  
    const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  // Pega o ID que a gente mandou da tela de Rota
  const caronaId = location.state?.caronaId;

  // Estados para o formulário
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");
  
  // Estado para armazenar os dados reais do banco (para não perder nada ao atualizar)
  const [dadosReais, setDadosReais] = useState(null);

  const dados = mockDadosCarona; // Mantém o visual fixo como você pediu

  // 1. Busca os dados reais da carona assim que a tela abre
  useEffect(() => {
    if (caronaId) {
      fetch(`${API_URL}/caronas/${caronaId}`)
        .then(res => res.json())
        .then(data => setDadosReais(data))
        .catch(err => console.error("Erro ao buscar dados reais:", err));
    }
  }, [caronaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setModalConfig({
          isOpen: true,
          title: 'Atenção',
          message: 'Por favor, selecione pelo menos uma estrela!',
          isAlertOnly: true,
          onConfirm: closeModal
        });
      return;
    }

    try {
      // Se temos o ID e os dados reais, atualizamos no banco
      if (caronaId && dadosReais) {
        
        const caronaAtualizada = {
          ...dadosReais, // Mantém origem, destino, horário, etc.
          status: "Finalizada", // <--- A MÁGICA: Muda a cor da tag para VERDE
          rating: rating,       // Salva as estrelas
          locked: false,        // Destrava as estrelas na visualização
          comentario: comentario // (Opcional) Salva o comentário
        };

        // Envia para o MockAPI
        await fetch(`${API_URL}/caronas/${caronaId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(caronaAtualizada)
        });
      }

      // 2. Notificação de Confirmação
      setModalConfig({
              isOpen: true,
              title: 'Sucesso',
              message: 'Sua avaliação foi registrada e a viagem finalizada!',
              isAlertOnly: true,
              onConfirm: () => {
                  closeModal();
                  navigate('/caronas'); // Navega só quando clicar OK
              }
            });

    } catch (error) {
      console.error("Erro ao avaliar:", error);
      alert("Erro de conexão ao salvar avaliação.");
    }
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
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        isAlertOnly={modalConfig.isAlertOnly}
        onClose={closeModal}
        onConfirm={() => {
          if (modalConfig.onConfirm) modalConfig.onConfirm();
        }}
      />
    </div>
  );
}