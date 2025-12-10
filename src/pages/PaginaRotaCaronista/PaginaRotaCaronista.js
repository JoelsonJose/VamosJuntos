import React, { useState, useEffect } from 'react';
import './PaginaRotaCaronista.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import StarRating from '../../components/StarRating/StarRating';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../Config'; // Importando API para funcionar de verdade
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

// --- IMAGENS (Mantidas) ---
import PerfilLucas from '../../assets/Fotos/usuario2.png';
import MapaRota from '../../assets/RotaCaronista/MAPAcaronista.png'; 
import ClockCinza from '../../assets/RotaCaronista/Clockcinza.png';
import LocationCinza from '../../assets/RotaCaronista/Locationcinza.png';
import MapPinpoint from '../../assets/RotaMotorista/Map Pinpoint.png';
import Wheelchair from '../../assets/RotaMotorista/Wheelchair.png';
import Person from '../../assets/RotaMotorista/Person.png';
import CarModelIcon from '../../assets/RotaMotorista/Koenigsegg One.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';

// Fotos extras para fallback
import FotoUsuario1 from '../../assets/Fotos/usuario1.png'; 
import FotoUsuario3 from '../../assets/Fotos/usuario3.png'; 
import FotoUsuario4 from '../../assets/Fotos/usuario4.png'; 
import FotoUsuario5 from '../../assets/Fotos/usuario5.png'; 

const mapaDeFotos = {
  "usuario1": FotoUsuario1,
  "usuario2": PerfilLucas, // Lucas
  "usuario3": FotoUsuario3,
  "usuario4": FotoUsuario4,
  "usuario5": FotoUsuario5
};

export default function PaginaRotaCaronista() {
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

  // Pega o ID que veio da tela anterior. Se não tiver, tenta pegar o primeiro do banco (fallback)
  const caronaId = location.state?.caronaId;
  const [carona, setCarona] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  const showConfirmationModal = (message, action) => {
    setModalMessage(message);
    setConfirmAction(() => action);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 1. BUSCAR DADOS DA CARONA ATUAL
  useEffect(() => {
    const fetchCarona = async () => {
      try {
        let url = `${API_URL}/caronas`;
        if (caronaId) url += `/${caronaId}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        // Se veio uma lista (caso não tenha ID), pega o último item criado (lógica de fallback)
        if (Array.isArray(data)) {
            setCarona(data[data.length - 1]); 
        } else {
            setCarona(data);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    };
    fetchCarona();
  }, [caronaId]);

  // Se ainda estiver carregando
  if (!carona) return <div style={{padding: 20}}>Carregando detalhes da viagem...</div>;

  // --- LÓGICA DOS BOTÕES ---

  // 2. CANCELAR (Atualiza status para Cancelada)
  const handleCancelar = () => {
    showConfirmationModal("Tem certeza que deseja cancelar esta viagem?", async () => {
      try {
        await fetch(`${API_URL}/caronas/${carona.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...carona, status: "Cancelada", locked: true, rating: 0 })
        });
        setModalConfig({
          isOpen: true,
          title: 'Atenção',
          message: 'Viagem cancelada',
          isAlertOnly: true,
          onConfirm: () => {
                  closeModal();
                  navigate('/caronas'); 
              }
        });
      } catch (error) {
        setModalConfig({
          isOpen: true,
          title: 'Atenção',
          message: 'Erro ao cancelar',
          isAlertOnly: true,
          onConfirm: () => {
                  closeModal();
                  navigate('/caronas'); 
              }
        });
      }
    });
  };

  // 3. FINALIZAR (Vai para Avaliação)
  const handleFinalizar = () => {
    navigate('/caronas/caronista/avaliacao', { state: { caronaId: carona.id } });
  };

  // 4. EXCLUIR (Remove do banco)
  const handleExcluir = () => {
    showConfirmationModal("Deseja apagar esta viagem do histórico?", async () => {
      try {
        await fetch(`${API_URL}/caronas/${carona.id}`, { method: 'DELETE' });
         setModalConfig({
          isOpen: true,
          title: 'Atenção',
          message: 'Viagem excluída',
          isAlertOnly: true,
          onConfirm: () => {
                  closeModal();
                  navigate('/caronas'); 
              }
        });
      } catch (error) {
        setModalConfig({
          isOpen: true,
          title: 'Atenção',
          message: 'Erro ao excluir',
          isAlertOnly: true,
          onConfirm: () => {
                  closeModal();
                  navigate('/caronas'); 
              }
        });
      }
    });
  };

  // Dados visuais
  const fotoMotorista = mapaDeFotos[carona.fotoId] || PerfilLucas;
  const status = carona.status || "Agendada";
  const isFinalizadaOrCancelada = status === "Finalizada" || status === "Cancelada";

  return (
    <div className="rota-pagina">
      <Sidebar activePage="caronas" />

      <div className="rota-conteudo">
        <ConfirmationModal
          isOpen={isModalOpen}
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        <button onClick={() => navigate('/caronas')} className="botao-voltar">
            &larr; Voltar para Minhas Caronas
        </button>
        <header className="rota-titulo-header">
          <h1>Minha viagem</h1>
          <p>Acompanhe sua viagem de perto</p>
        </header>

        <main className="rota-principal-container">

          {/* Coluna esquerda */}
          <div className="rota-mapa-progress-wrapper">
            <div className="rota-progress-header">
              <p className="rota-descricao">
                {carona.origem} → {carona.destino}
              </p>
              {/* Badge Dinâmica baseada no status */}
              <div className={`status-badge status-${status.toLowerCase()}`}>{status}</div>
            </div>

            <div className="info-compacta card-branco">
              <div className="info-compacta-left">
                <img src={ClockCinza} alt="Relógio" className="info-icon-small" />
                <span className="info-compacta-text">{carona.horario}</span>
                <img src={LocationCinza} alt="Local" className="info-icon-small location" />
                <span className="info-compacta-text">Ponto de embarque: {carona.origem}</span>
              </div>
            </div>

            <div className="rota-mapa card-branco">
              <img src={MapaRota} alt="Mapa da Rota" className="mapa-img" />
            </div>
          </div>

          {/* Coluna direita */}
          <div className="card-lateral-direita">
            <div className="motorista-header-card">
              <div className="motorista-info-perfil">
                <img src={fotoMotorista} alt="Foto do Motorista" className="perfil-img" />
                <div className="motorista-detalhes">
                  <strong className="nome-motorista">{carona.motorista || "Motorista"}</strong>
                  <StarRating rating={carona.rating || 0} />
                </div>
              </div>
            </div>

            <div className="rota-infos-resumo">
              <div className="carro-modelo">
                <img src={CarModelIcon} alt="Modelo do Carro" className="carro-modelo-icon" />
                Honda civic 2023
              </div>
              <p className="caronas-info">546 caronas feitas</p>
              <div className="info-item-icon">
                <img src={Person} alt="Vagas" />
                <span>4 vagas</span>
              </div>
              <div className="info-item-icon">
                <img src={Wheelchair} alt="Acessibilidade" />
                <span>Acessibilidade</span> <div className="status-dot green"></div>
              </div>
              <div className="info-item-icon">
                <img src={MapPinpoint} alt="Distância" />
                <span>1,8 km de você - 6 minutos</span>
              </div>
              <div className="placa-row">
                <strong>PLACA:</strong>
                <div className="placa-badge">BRA2E19</div>
              </div>
            </div>

            <hr className="divider-lista"/>

            <div className="comentarios-lista">
              <div className="comentario-box">
                <p className="comentario-text">"Ótimo motorista, dirigibilidade segura e confiante."</p>
              </div>
              <div className="comentario-box">
                <p className="comentario-text">"Chegou no local na hora exata, ótima motorista."</p>
              </div>
            </div>

            {/* --- BOTÕES COM LÓGICA DE TROCA --- */}
            <div className="botoes-acao-container" style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px'}}>
              
              {isFinalizadaOrCancelada ? (
                // Se já acabou ou cancelou, mostra EXCLUIR
                <button 
                    onClick={handleExcluir} 
                    className="cancelar-btn"
                >
                  Excluir Histórico
                </button>
              ) : (
                // Se está ativa/agendada, mostra FINALIZAR e CANCELAR
                <>
                  <button 
                    onClick={handleFinalizar} 
                    className="cancelar-btn"
                  >
                    Finalizar carona
                  </button>

                  <button 
                    onClick={handleCancelar} 
                    className="cancelar-btn"
                  >
                    Cancelar viagem
                  </button>
                </>
              )}
            
            </div>

          </div>
        </main>
        <BotaoAcessibilidade/>
      </div>
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